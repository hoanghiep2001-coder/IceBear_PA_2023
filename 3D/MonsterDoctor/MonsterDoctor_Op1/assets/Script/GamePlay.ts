import { _decorator, Animation, AudioSource, Camera, view, Vec2, Component, EventTouch, Graphics, log, math, Node, PhysicsSystem, quat, RigidBody, SkeletalAnimation, Skeleton, Vec3, UITransform, ParticleSystem } from 'cc';
import { GameController } from './GameController';
import { AudioManager } from './AudioManager';
import { JoyStick } from './JoyStick';
const { ccclass, property } = _decorator;
@ccclass('GamePlay')
export class GamePlay extends Component {
    // Camera
    @property(Camera)
    Camera: Camera = null;

    // component
    @property(GameController)
    GameController: GameController;
    @property(AudioManager)
    AudioManager: AudioManager;


    protected onLoad(): void {
        
    }


    protected start(): void {
        
    }


    protected update(dt: number): void {

    }
}
