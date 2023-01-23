export function animationMove(time, carPicture) {
    const racingLine = document.querySelector('.racing__content');
    const btnStart = document.querySelector('.car__btn--a');
    const btnStop = document.querySelector('.car__btn--b');
    const carWidth = 110; /* ширина машинки в пикселях */
    const carKeyFrameMove = new KeyframeEffect(carPicture, [
        {
            transform: `translateX(${racingLine.offsetWidth - carWidth - btnStart.offsetWidth - btnStop.offsetWidth}px)`,
        },
    ], { duration: time, fill: 'forwards', iterations: 1 });
    // eslint-disable-next-line no-new
    const carAnimationMove = new Animation(carKeyFrameMove);
    return carAnimationMove;
}
