import { useEffect, useRef } from 'react'
import styles from './Style.module.css'

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const circleElement = cursorRef.current;
    if (!circleElement) return;

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: -100, y: -100 }; // Start off-screen
    const previousMouse = { x: -100, y: -100 }
    const circle = { x: -100, y: -100 };

    let currentScale = 0;
    let currentAngle = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const speed = 0.15;

    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;
      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }
      const rotateTransform = `rotate(${currentAngle}deg)`;

      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

      animationFrameId = window.requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className='pointer-events-none fixed inset-0 z-[9999] hidden sm:block'>
      <div
        ref={cursorRef}
        className={styles.cursor}
      ></div>
    </div>
  )
}

export default Cursor
