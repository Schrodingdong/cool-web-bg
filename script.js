class Particle{
    startAngle = 0; 
    endAngle = Math.PI * 2;
    counterclockwise = true;
    constructor(x,y,r,speedFactor){
        console.log("params :",x," ",y," ",r," ",speedFactor)
        this.x = x;
        this.y = y;
        this.dx = (Math.random()-0.5) * speedFactor
        this.dy = (Math.random()-0.5) * speedFactor
        this.radius = r;
    };

    initParticle(){ 
        ctx.beginPath();
        ctx.arc(this.x,this.y,
                this.radius,this.startAngle,this.endAngle,this.counterclockwise)
        ctx.fill()
    }
    moveParticle(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,r,0,Math.PI *2);

        //x velocity
        if (this.x+r >= innerWidth){
            this.x = innerWidth-1;
            this.dx = -(this.dx);
        }
        else if (this.x-r <= 0) {
            this.x = 1;
            this.dx = -(this.dx);
        }
        this.x += this.dx ;

        //y velocity
        if (this.y+r >= innerHeight ){
            this.y = innerHeight -1;
            this.dy = - (this.dy);
        }
        else if (this.y-r <= 0) {
            this.y = 1;
            this.dy = - (this.dy);
        }
        this.y += this.dy;

        //draw & fill
        ctx.fillStyle = "red";
        ctx.fill();
    }
    getDistanceFrom(point){
      var diff_x = this.x - point.x
      var diff_y = this.y - point.y
      return Math.sqrt(diff_x**2 + diff_y**2)
    }
};
  



class ParticleManager{
    particleList = [];
    bgOppacity = 1;
    constructor(particleList,bgOppacity,distanceThresh,lineColor){
        this.particleList = particleList;
        this.distanceThresh = distanceThresh;
        this.lineColor = lineColor;
        if (bgOppacity >=1) 
            this.bgOppacity = bgOppacity;
    }

    addParticle(particle){
        this.particleList.push(particle)
    }

    drawParticleLines(numberOfParticlesToLink = false){
        if (!numberOfParticlesToLink){
            particleList.forEach(p =>{
                // p is our main particle
                particleList.forEach(q=>{
                    if (p != q){
                        ctx.beginPath();
                        ctx.moveTo(p.x,p.y);
                        ctx.lineTo(q.x,q.y);
                        ctx.strokeStyle = 'blue'
                        ctx.stroke();
                    }
                })
            })
        }
        else {
            this.particleList.forEach(p =>{
                // p is our main particle
                this.particleList.forEach(q=>{
                    if (p != q){
                        var distance = p.getDistanceFrom(q);
                        if ( distance <= this.distanceThresh) {
                            
                            ctx.beginPath();
                            ctx.moveTo(p.x,p.y);
                            ctx.lineTo(q.x,q.y);
                            var alphaValue = (1 - distance/this.distanceThresh)/this.bgOppacity;
                            var tmp = this.lineColor.split(')')[0];
                            ctx.strokeStyle = tmp+','+alphaValue+')';
                            ctx.stroke();
                        }
                    }
                })
            })
        }
    }
}


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize',()=>{ //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
  
  
  
//---------------------------------------- FORGROUND ----------------------------------------
//initiate the particles 
r = 0;
const PARTICLE_NUMBER_FG = 10;
const SPEED_FACTOR_FG = 6;
var particleList_fg = [];
for (var i  = 0 ; i < PARTICLE_NUMBER_FG ; i++){
    pos_x = Math.random() * innerWidth;
    pos_y = Math.random() * innerHeight;
    console.log("posx = ",pos_x)
    console.log("posy = ",pos_y)
    p = new Particle(pos_x,pos_y,r,SPEED_FACTOR_FG);
    console.log(p)
    particleList_fg.push(p);
}
//initialisz the particle manager :
var distanceThresh = 700;
var lineOppacity = 1;
lineColor = "rgba(250, 88, 182)"
var p_manager_fg = new ParticleManager(particleList_fg,lineOppacity,distanceThresh,lineColor);


//---------------------------------------- BACKGROUND ---------------------------------------
//initiate the particles 
r = 0;
const PARTICLE_NUMBER_BG = 20;
const SPEED_FACTOR_BG = 3;
var particleList_bg = [];
for (var i  = 0 ; i < PARTICLE_NUMBER_BG ; i++){
    pos_x = Math.random() * innerWidth;
    pos_y = Math.random() * innerHeight;
    p = new Particle(pos_x,pos_y,r,SPEED_FACTOR_BG);
    particleList_bg.push(p);
}

//initialisz the particle manager :
distanceThresh = 700;
lineColor = "rgba(250, 88, 182)"
lineOppacity = 7;
p_manager_bg = new ParticleManager(particleList_bg,lineOppacity,distanceThresh,lineColor);


//---------------------------------------- ANIMATION ----------------------------------------
//the animation function
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)


    particleList_fg.forEach(element => {
        element.moveParticle();
    });
    p_manager_fg.drawParticleLines(true);

    particleList_bg.forEach(element => {
        element.moveParticle();
    });
    p_manager_bg.drawParticleLines(true);
}
animate()  