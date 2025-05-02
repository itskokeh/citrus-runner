export function pauseVelocity (objects) {
  objects.forEach(obj => {
    if (obj && obj.body) {
      obj.originalVelocityX = obj.body.velocity.x;
      obj.originalVelocityY = obj.body.velocity.y;
      obj.setVelocity(0, 0);
    }
  });
}

export function resumeVelocity (objects) {
  objects.forEach(obj => {
    if (obj && obj.body && obj.originalVelocityX !== undefined) {
      obj.setVelocity(obj.originalVelocityX, obj.originalVelocityY || 0);
    }
  });
}
