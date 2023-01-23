export function animationMove(time: number, carPicture: HTMLElement): Animation {
  const racingLine = document.querySelector('.racing__content') as HTMLElement;
  const btnStart = document.querySelector('.car__btn--a') as HTMLElement;
  const btnStop = document.querySelector('.car__btn--b') as HTMLElement;
  const carWidth = 110; /* ширина машинки в пикселях */
  const carKeyFrameMove = new KeyframeEffect(
    carPicture,
    [
      {
        transform: `translateX(${racingLine.offsetWidth - carWidth - btnStart.offsetWidth - btnStop.offsetWidth}px)`,
      },
    ],
    { duration: time, fill: 'forwards', iterations: 1 },
  );
  // eslint-disable-next-line no-new
  const carAnimationMove = new Animation(carKeyFrameMove);
  return carAnimationMove;
}
