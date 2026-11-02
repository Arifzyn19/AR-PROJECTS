/**
 * ARIFZYN — Generative Web Audio API Ambient Soundscape
 * Procedural low-frequency architectural room tone and harmonic drone.
 * Zero external audio files; pure generative synthesis.
 */

class AmbientSoundscapeManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private isMuted: boolean = false;
  private isRunning: boolean = false;
  private targetVolume: number = 0.09; // Subtle, high-end museum atelier ambient level
  private listeners: Set<(isMuted: boolean, isRunning: boolean) => void> = new Set();

  constructor() {
    // Check saved user preference if available
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('arifzyn_ambient_muted');
        if (saved !== null) {
          this.isMuted = saved === 'true';
        }
      } catch {}
    }
  }

  public subscribe(listener: (isMuted: boolean, isRunning: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted, this.isRunning);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isMuted, this.isRunning));
  }

  private initContext() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;

    this.ctx = new AudioCtxClass();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-Pass Architectural Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(160, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.2, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // 1. Fundamental Sub-Bass Tone (48 Hz - G0)
    const oscSub = this.ctx.createOscillator();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(48, this.ctx.currentTime);
    const gainSub = this.ctx.createGain();
    gainSub.gain.setValueAtTime(0.7, this.ctx.currentTime);
    oscSub.connect(gainSub);
    gainSub.connect(this.filter);
    oscSub.start();
    this.oscillators.push(oscSub);

    // 2. Harmonic Fifth Tone (72 Hz - D1)
    const oscFifth = this.ctx.createOscillator();
    oscFifth.type = 'sine';
    oscFifth.frequency.setValueAtTime(72.2, this.ctx.currentTime);
    const gainFifth = this.ctx.createGain();
    gainFifth.gain.setValueAtTime(0.35, this.ctx.currentTime);
    oscFifth.connect(gainFifth);
    gainFifth.connect(this.filter);
    oscFifth.start();
    this.oscillators.push(oscFifth);

    // 3. Warm Triangle Drone with Micro-Detune (96 Hz - G1)
    const oscWarm = this.ctx.createOscillator();
    oscWarm.type = 'triangle';
    oscWarm.frequency.setValueAtTime(96.1, this.ctx.currentTime);
    const gainWarm = this.ctx.createGain();
    gainWarm.gain.setValueAtTime(0.2, this.ctx.currentTime);
    oscWarm.connect(gainWarm);
    gainWarm.connect(this.filter);
    oscWarm.start();
    this.oscillators.push(oscWarm);

    // 4. Ultra-slow Breathing LFO modulating the filter cutoff frequency
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.06, this.ctx.currentTime); // ~16s breathing cycle
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(50, this.ctx.currentTime);
    lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);
    lfo.start();
    this.oscillators.push(lfo);

    // 5. Filtered Brownian Room Tone Texture (simulates museum atelier acoustics)
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.noiseNode.connect(noiseGain);
      noiseGain.connect(this.filter);
      this.noiseNode.start();
    } catch {}
  }

  /**
   * Start the soundscape after intro concludes.
   * Smoothly fades in over 3.5 seconds.
   */
  public start(): void {
    this.isRunning = true;
    this.initContext();

    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      const unlockAudio = () => {
        this.ctx?.resume().then(() => {
          this.applyVolumeTransition();
        });
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }

    this.applyVolumeTransition(3.5);
    this.notify();
  }

  private applyVolumeTransition(durationSec: number = 0.8) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const target = this.isMuted ? 0 : this.targetVolume;

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(target, now + durationSec);
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.initContext();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('arifzyn_ambient_muted', String(this.isMuted));
    } catch {}

    this.applyVolumeTransition(0.7);
    this.notify();
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    if (this.isMuted === muted) return;
    this.toggleMute();
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public dispose() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.noiseNode?.stop();
    this.noiseNode?.disconnect();
    this.masterGain?.disconnect();
    this.ctx?.close();
    this.ctx = null;
    this.isRunning = false;
  }
}

export const ambientSoundscape = new AmbientSoundscapeManager();
