window.addEventListener("load",function(){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let starArray=[]; 
    let radian=0;
    let vr=0.0005;
    let bgAlpha=0.1
   
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    window.addEventListener("keydown",function(e){
      if(e.key==="ArrowUp"){
          vr+=0.0001;
          bgAlpha-=0.01;
      }else if(e.key==="ArrowDown"){
          vr-=0.0001;
          bgAlpha+=0.01;
      }else if(e.key==="s"){
          starArray.push(new ShootingStar());
      }else if(e.key==="m"){
          starArray.push(new Meteor());
      }else if(e.key==="c"){
          starArray.push(new Comet());
      }
    });
  class Star{
      constructor() {
          this.x=Math.random()*canvas.width-canvas.width/2;
          this.y=Math.random()*canvas.height-canvas.height/2;
          this.size=Math.random()*5;
          this.color=`hsl(${Math.random()*255},100%,85%)`;
      }
      update(){
          this.draw();  
      }
      draw(){
          context.fillStyle=this.color;
         
          context.shadowBlur=5;
     context.shadowColor=this.color;
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI *2);
          context.fill();
          context.closePath();
      }
  }
  class ShootingStar{
      constructor(){
          this.x=Math.random()*canvas.width;
          this.y=Math.random()*canvas.height;
          this.size=Math.floor(Math.random()*3)+1;
          this.color="aliceblue";
          this.vx=-40;
          this.vy=-10;
      }
      update(){
          this.draw();
          this.vy+=0.2;
          this.x+=this.vx;
          this.y+=this.vy;
      }
      draw(){
          context.fillStyle=this.color;
          context.shadowBlur=5;
          context.shadowColor=this.color;
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI *2);
          context.fill();
          context.closePath();
      }
  }
  class Meteor{
      constructor(){
          this.x=Math.random()*canvas.width-canvas.width/2;
          this.y=Math.random()*canvas.height-canvas.height/2;
          this.color="rgb(156, 27, 10)";
          this.vx=5;
          this.vy=0;
      }
      update(){
          this.vy+=0.1;
          this.draw();
          this.x+=this.vx;
          this.y+=this.vy;
      }
      draw(){
          context.strokeStyle=this.color;
          
          context.fillStyle=this.color;
          context.shadowBlur=3;
          context.shadowColor='rgb(255, 69, 44)';
          
          context.beginPath();
          context.moveTo(this.x, this.y);

          context.lineTo(this.x+15, this.y-55);
          context.lineTo(this.x+35, this.y-39);
          context.lineTo(this.x+55, this.y-9);
          context.lineTo(this.x+35, this.y+29);
          context.lineTo(this.x+5, this.y+1);
          
         
         
         
         
         
          
          context.closePath();
        
        context.stroke();
          context.fill();
       
      }
  }
 class Comet{
  constructor(){
          this.x=Math.random()*canvas.width-canvas.width/2;
          this.y=Math.random()*canvas.height-canvas.height/2;
          this.size=Math.floor(Math.random()*6)+1;
          this.color="rgb(143, 229, 255)";
          this.vy=-5;
          this.vx=10;
      }
      update(){
          this.draw();
          this.x+=this.vx;
          this.y+=this.vy;     
      }
      draw(){
          context.fillStyle=this.color;
          context.strokeStyle=this.color;
          context.shadowBlur=5;
          context.shadowColor=this.color;
          context.beginPath();
          context.moveTo(this.x, this.y);
          
        context.bezierCurveTo(this.x+5, this.y+25, this.x+75, this.y-25, this.x, this.y);
        context.stroke();
        
          context.fill();
          context.closePath();
      }
 }
  for(let i=0;i<250;i++){
      starArray.push(new Star());
  }  
 
    
   
     
  
    function animate() {
      context.fillStyle=`rgba(0,0,0,${bgAlpha})`;
      context.fillRect(0,0,canvas.width,canvas.height);
     
     
    context.save();
   
    context.translate(canvas.width/2, canvas.height/2);
    context.rotate(radian);
    starArray.forEach(star => star.update());
    
    context.restore();
    
    radian+=vr;
    
      requestAnimationFrame(animate);
    }
    animate();
});