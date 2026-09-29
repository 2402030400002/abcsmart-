export interface GeolocationData {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
  addressSnippet?: string;
}

class EmergencyService {
  private audioCtx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isSirenActive: boolean = false;

  async getCurrentLocation(): Promise<GeolocationData> {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        resolve({
          lat: 34.0837,
          lng: 74.7973,
          accuracy: 50,
          timestamp: Date.now(),
          addressSnippet: "Srinagar (GPS Simulated)"
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: pos.timestamp,
            addressSnippet: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`
          });
        },
        (_err) => {
          // Default to Srinagar center if permission denied/fails
          resolve({
            lat: 34.0837,
            lng: 74.7973,
            accuracy: 100,
            timestamp: Date.now(),
            addressSnippet: "Near Dal Lake, Srinagar (Approximate)"
          });
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
      );
    });
  }

  generateEmergencySMSUrl(contactNumber: string, location: GeolocationData, userName: string): string {
    const mapLink = `https://maps.google.com/?q=${location.lat},${location.lng}`;
    const text = encodeURIComponent(
      `EMERGENCY ALERT: This is ${userName || "a tourist"}. I have activated SmartSafar Emergency SOS in Jammu & Kashmir. My current location is ${location.addressSnippet || "J&K"}: ${mapLink} . Please contact local authorities or call 112.`
    );
    return `sms:${contactNumber}?body=${text}`;
  }

  startSirenAudio(): void {
    try {
      if (this.isSirenActive) return;
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.audioCtx = new AudioCtxClass();
      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = "sawtooth";
      this.gainNode.gain.setValueAtTime(0.15, this.audioCtx.currentTime);

      // Modulate frequency for distinct emergency siren pulse
      let high = true;
      const interval = setInterval(() => {
        if (!this.isSirenActive || !this.oscillator || !this.audioCtx) {
          clearInterval(interval);
          return;
        }
        const now = this.audioCtx.currentTime;
        this.oscillator.frequency.setValueAtTime(high ? 880 : 520, now);
        high = !high;
      }, 350);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.oscillator.start();
      this.isSirenActive = true;
    } catch (e) {
      console.warn("Could not play synthetic siren audio:", e);
    }
  }

  stopSirenAudio(): void {
    try {
      this.isSirenActive = false;
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
      if (this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
      }
    } catch (e) {
      console.warn("Error stopping siren audio:", e);
    }
  }

  getIsSirenActive(): boolean {
    return this.isSirenActive;
  }
}

export const emergencyService = new EmergencyService();
