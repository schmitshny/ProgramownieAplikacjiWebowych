window.addEventListener('DOMContentLoaded', () => {
 const inputWrapper = document.querySelector<HTMLDivElement>('.input-wrapper');
 const sumEl = document.querySelector<HTMLSpanElement>('.sum');
 const avgEl = document.querySelector<HTMLSpanElement>('.avg');
 const minEl = document.querySelector<HTMLSpanElement>('.min');
 const maxEl = document.querySelector<HTMLSpanElement>('.max');

 const inputsEl = inputWrapper?.querySelectorAll<HTMLInputElement>('.input')

 inputWrapper?.addEventListener('change', (e) => {
   if (e.target instanceof Element && e.target.classList.contains('input')) {
      const inputsVal: number[] = []

    inputsEl?.forEach(input => {
      inputsVal.push(+input.value);
    });

    if (sumEl) {
      sumEl.innerHTML = inputsVal.reduce((a,b ) => a + b, 0).toString();
    }
   
    if (avgEl) {
      avgEl.innerHTML = (inputsVal.reduce((a,b ) => a + b, 0) / inputsVal.length).toString();
    }

    if (minEl) {
      minEl.innerHTML = Math.min(...inputsVal).toString();
    }

    if (maxEl) {
      maxEl.innerHTML = Math.max(...inputsVal).toString();;
    }
   }
 });
});