class Stats{
    data1: HTMLInputElement;
    data2: HTMLInputElement;
    data3: HTMLInputElement;
    data4: HTMLInputElement;

    sum: HTMLInputElement;
    avg: HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;

    getInputs(){
        this.data1=document.querySelector('#data1');
        this.data2=document.querySelector('#data2');
        this.data3=document.querySelector('#data3');
        this.data4=document.querySelector('#data4');
        this.sum=document.querySelector('#sum');
        this.avg=document.querySelector('#avg');
        this.min=document.querySelector('#min');
        this.max=document.querySelector('#max');
    }
}
