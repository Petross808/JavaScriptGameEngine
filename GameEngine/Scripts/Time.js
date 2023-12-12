class Time
{
    static deltaTime = 0;
    
    static get deltaTime() {
        return this.deltaTime;
    }

    lastTimeStamp = 0;
    SetDeltaTime(currentTimeStamp)
    {
        deltaTime = this.lastTimeStamp - currentTimeStamp;
        this.lastTimeStamp = currentTimeStamp;
    }
}