import { Collider } from "../GameEngine/Scripts/Components/Collider.js";
import { Rigidbody } from "../GameEngine/Scripts/Components/Rigidbody.js";
import { SpriteRenderer } from "../GameEngine/Scripts/Components/SpriteRenderer.js";
import { GameObject } from "../GameEngine/Scripts/GameObject.js";
import { Vector2 } from "../GameEngine/Scripts/Structs/Vector2.js";
import { EntityHealth } from "./EntityHealth.js";
import { Projectile } from "./Projectile.js";
import { Sprites } from "./Resources.js";
import { TextUI } from "../GameEngine/Scripts/TextUI.js";
import { Time } from "../GameEngine/Scripts/Time.js";

export class Enemy extends GameObject
{
    #rb;
    #render;
    #collider;
    #health;
    #healthUI;

    #timer = 1;

    #player;
    #phase = 1;
    #shotCount = 0;

    get player() { return this.#player.deref(); }
    set player(value) { this.#player = value; }

    #ui;
    get ui() { return this.#ui.deref(); }
    set ui(value) { this.#ui = value; }

    Start()
    {
        this.tag = "enemy";
        this.layer = 1 << 5;

        this.#rb = this.AddComponent(Rigidbody);
        this.#rb.gravityMultiplier = 0;
        this.#rb.isPushable = false; 

        this.#render = this.AddComponent(SpriteRenderer);
        this.#render.size = new Vector2(96,96);
        this.#render.color = "red";

        this.#collider = this.AddComponent(Collider);
        this.#collider.size = new Vector2(60,60);

        this.#health = this.AddComponent(EntityHealth);
        this.#health.health = 25;
        this.#health.enemyTag = "playerProjectile";

        this.#healthUI = this.AddComponent(TextUI);
        this.#healthUI.screenPos.Set(800,100)
    }

    Update()
    {
        this.#healthUI.text = "Enemy: " + this.#health.health;


        this.#timer -= Time.deltaTime;
        if(this.#timer <= 0)
        {
            switch(this.#phase)
            {
                case 1:
                    this.#timer = 1;
                    this.SpreadShot();
                    this.#phase = 2;
                    break;
                case 2:
                    this.#timer = 1;
                    this.SpreadShot2();
                    if(this.#shotCount < 2)
                    {
                        this.#shotCount += 1;
                        this.#phase = 1;
                    }
                    else
                    {
                        this.#shotCount = 0;
                        this.#phase = 3;
                    }
                    break;
                case 3:
                    this.#timer = 0.25;
                    this.ShootAtPlayer();
                    if(this.#shotCount <= 20)
                    {
                        this.#shotCount += 1;
                    }
                    else
                    {
                        this.#shotCount = 0;
                        this.#phase = 4;
                    }
                    break;
                case 4:
                    this.#timer = 0.1;
                    this.WaveShoot();
                    if(this.#shotCount <= 40)
                    {
                        this.#shotCount += 1;
                    }
                    else
                    {
                        this.#shotCount = 0;
                        this.#phase = 5;
                    }
                    break;
                case 5:
                    this.#timer = 0.5;
                    this.RandomSpread();
                    if(this.#shotCount <= 4)
                    {
                        this.#shotCount += 1;
                    }
                    else
                    {
                        this.#shotCount = 0;
                        this.#phase = 6;
                    }
                    break;
                case 6:
                    this.#timer = 0.15;
                    this.ShootAtPlayerWithRandom();
                    if(this.#shotCount <= 40)
                    {
                        this.#shotCount += 1;
                    }
                    else
                    {
                        this.#shotCount = 0;
                        this.#phase = 1;
                    }
                    break;
            }
        }
    }

    Shoot(shotVector)
    {
        const proj = this.game.Instantiate(new Projectile, this.transform.position.Copy());
        proj.render.texture = Sprites.enemyProjectile;
        proj.collider.ignoreLayer |= 1 << 5;
        proj.rb.velocity = shotVector;
        proj.enemyTag = "player";
    }


    SpreadShot()
    {
        const vec = new Vector2(0, 300);
        this.Shoot(Vector2.RotateVector(vec, 0));
        this.Shoot(Vector2.RotateVector(vec, 15));
        this.Shoot(Vector2.RotateVector(vec, 30));
        this.Shoot(Vector2.RotateVector(vec, 45));
        this.Shoot(Vector2.RotateVector(vec, -15));
        this.Shoot(Vector2.RotateVector(vec, -30));
        this.Shoot(Vector2.RotateVector(vec, -45));
    }

    SpreadShot2()
    {
        const vec = new Vector2(0, 300);
        this.Shoot(Vector2.RotateVector(vec, 7.5));
        this.Shoot(Vector2.RotateVector(vec, -7.5));
        this.Shoot(Vector2.RotateVector(vec, 22.5));
        this.Shoot(Vector2.RotateVector(vec, -22.5));
        this.Shoot(Vector2.RotateVector(vec, 37.5));
        this.Shoot(Vector2.RotateVector(vec, -37.5));
    }

    ShootAtPlayer()
    {
        const vec = this.transform.position.Copy().Add(Vector2.Add(this.player.transform.position,this.transform.position.negative)).Add(this.transform.position.negative);
        this.Shoot(vec.normalized.Scale(600));
    }

    WaveShoot()
    {
        const vec = new Vector2(0, 300);
        if(this.#shotCount <= 20)
        {
            this.Shoot(Vector2.RotateVector(vec, -50 + 5*this.#shotCount));
        }
        else
        {
            this.Shoot(Vector2.RotateVector(vec, 50 - 5*(this.#shotCount-20)));
        }
    }

    RandomSpread()
    {
        const vec = new Vector2(0, 300);
        for(let i = 0; i < 15; i++)
            this.Shoot(Vector2.RotateVector(vec, Math.random()*100-50));
    }

    ShootAtPlayerWithRandom()
    {
        const vec = this.transform.position.Copy().Add(Vector2.Add(this.player.transform.position,this.transform.position.negative)).Add(this.transform.position.negative);
        this.Shoot(vec.normalized.Scale(300).Rotate(Math.random()*40-20));
    }

    OnDestroy()
    {
        Time.scale = 0;

        const win = this.ui.AddComponent(TextUI);
        win.text = "You won";
        win.screenPos.Set(this.game.renderer.canvas.width/2-100,this.game.renderer.canvas.height/2-50);
        const win2 = this.ui.AddComponent(TextUI);
        win2.text = "Press R to restart";
        win2.screenPos.Set(this.game.renderer.canvas.width/2-200,this.game.renderer.canvas.height/2+50);
    }

}