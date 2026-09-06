#!/bin/bash
sed -i '/.demo-slider {/,$d' src/index.css
cat << 'CSS' >> src/index.css
/* 3D Demo Slider CSS (JS Controlled now) */
.demo-slider {
  transform-style: preserve-3d;
  transform: perspective(2500px) rotateX(-16deg);
  /* JS will control rotateY */
}

.demo-slider .item {
  position: absolute;
  inset: 0 0 0 0;
  transform: rotateY(calc((var(--position) - 1) * (360deg / var(--quantity)))) translateZ(350px);
}

@media (min-width: 768px) {
  .demo-slider .item {
    transform: rotateY(calc((var(--position) - 1) * (360deg / var(--quantity)))) translateZ(550px);
  }
}
CSS
