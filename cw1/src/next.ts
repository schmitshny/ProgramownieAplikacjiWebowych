class InputEl {
  private templateEl: HTMLTemplateElement;
  private hostEl: HTMLDivElement;
  private element: HTMLDivElement;
  private id: number;
  private isInputSelected: boolean = false;
  private value: number | string = 0;

  constructor(id: number) {
    this.id = id;
    const templateEL = document.querySelector<HTMLTemplateElement>('#input-group-template');

    if (templateEL) {
      this.templateEl = templateEL;
    } else {
      throw new Error('TemplateEl not found')
    }

    const hostEl = document.querySelector<HTMLDivElement>('.input-wrapper')

    if (hostEl) {
      this.hostEl = hostEl;
    } else {
      throw new Error('HostEl not found')
    }

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLDivElement;

    const selectEl = this.element.querySelector<HTMLInputElement>('.select');

    selectEl?.addEventListener('change', () => {
      this.isInputSelected = selectEl.checked;
    });

    const input = this.element.querySelector<HTMLInputElement>('.input');

    input?.addEventListener('change', () => {
      this.value = input.value;
    })

    this.element.dataset.id = this.id.toString();

    this.attach();
  }

  public isSelected(): boolean {
    return this.isInputSelected;
  }

  public getId(): number {
    return this.id;
  }

  public getValue(): number | string {
    return this.value;
  }

  private attach(): void {
    this.hostEl.insertAdjacentElement('afterbegin', this.element);
  }

  public detach(): void {
    this.element.remove();
  }
}

class InputGroup {
  private wrapper: HTMLDivElement;
  private inputCountEl: HTMLInputElement;
  private inputCount: number = 0;
  private deleteEl: HTMLInputElement;
  private id = 0;

  private sumEl: HTMLElement;
  private avgEl: HTMLElement;
  private minEl: HTMLElement;
  private maxEl: HTMLElement;

  private inputs:  Map<number, InputEl> = new Map();

  constructor() {
    const wrapper = document.querySelector<HTMLDivElement>('.input-wrapper');

    if (wrapper) {
      this.wrapper = wrapper;
    } else {
      throw new Error('wrapper not found')
    }

    const inputCountEl = document.querySelector<HTMLInputElement>('.controls .input-count');

    if (inputCountEl) {
      this.inputCountEl = inputCountEl;
    } else {
      throw new Error('inputCountEl not found')
    }

    const deleteEl = document.querySelector<HTMLInputElement>('.controls .delete');

    if (deleteEl) {
      this.deleteEl = deleteEl;
    } else {
      throw new Error('deleteEl not found')
    }

    const sumEl = document.querySelector<HTMLSpanElement>('.sum');

    if (sumEl) {
      this.sumEl = sumEl;
    } else {
      throw new Error('sumEL not found')
    }

    const avgEl = document.querySelector<HTMLSpanElement>('.avg');

    if (avgEl) {
      this.avgEl = avgEl;
    } else {
      throw new Error('avgEl not found')
    }

    const minEl = document.querySelector<HTMLSpanElement>('.min');

    if (minEl) {
      this.minEl = minEl;
    } else {
      throw new Error('minEl not found')
    }

    const maxEl = document.querySelector<HTMLSpanElement>('.max');

    if (maxEl) {
      this.maxEl = maxEl;
    } else {
      throw new Error('maxEl not found')
    }
    
    this.configure();
  }

 private configure() {
   this.inputCountEl.addEventListener('change', (e) => {
     this.inputCount =  +this.inputCountEl.value;

     if (this.inputCount < 0) {
       this.inputCount = 0;
       this.inputCountEl.value = '0';
     }

     this.removeAll();

     for (let i = 0; i < this.inputCount; i++) {
      this.addInput();
     }

     this.calc();
   });

   this.wrapper.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.classList.contains('delete')) {
      const id =  e.target.closest<HTMLDivElement>('.input-group')?.dataset.id;

      if (id) {
        const input = this.inputs.get(+id);
        input?.detach();
        this.inputs.delete(+id);
        this.calc();
      }
    }
  });

  this.wrapper.addEventListener('change', (e) => {
    if (e.target instanceof Element && e.target.classList.contains('input')) {
      this.calc();
    }
  });

  this.deleteEl.addEventListener('click', (e) => {
    this.inputs.forEach(input => {
      
      if (input.isSelected()) {
        this.inputs.delete(input.getId());
        input.detach();
      }
    })

    this.calc();
  });
 }

 private removeAll(){
   this.inputs.forEach(input => {
     input.detach();
   })
   this.inputs = new Map();
 }

  private addInput() {
    const id = this.id++;
    this.inputs.set(id, new InputEl(id))
  }

  private calc() {
    
    const inputsVal: number[] = [];
    
    this.inputs.forEach(input => {
      inputsVal.push(+input.getValue());
    })

    if (inputsVal.length === 0) {
      inputsVal.push(0);
    }

    if (inputsVal.some(element => isNaN(element))) {
      this.sumEl.innerHTML = 'Błąd';
      this.avgEl.innerHTML = 'Błąd';
      this.minEl.innerHTML = 'Błąd';
      this.maxEl.innerHTML = 'Błąd';
    } else {
      this.sumEl.innerHTML = inputsVal.reduce((a,b ) => a + b, 0).toString();
      this.avgEl.innerHTML = (inputsVal.reduce((a,b ) => a + b, 0) / inputsVal.length).toString();
      this.minEl.innerHTML = Math.min(...inputsVal).toString();
      this.maxEl.innerHTML = Math.max(...inputsVal).toString();
    }

    this.inputCountEl.value = this.inputs.size.toString();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new InputGroup();
})