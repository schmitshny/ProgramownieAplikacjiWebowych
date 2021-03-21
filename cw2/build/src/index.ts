function appStart(): void {
    window.addEventListener('keypress', onKeyDown);
    const btnPlayChannel = document.querySelector('playChanne')
    btnPlayChannel.addEventListener('click', onPlayChannel)
    getAudioTags();
}

function onPlayChannel(): void{
    channel.forEach(sound=>(setTimeout(()=>playSound(sound.key)sound.time)))
}

function getAudioTags(){
    clapSound = document.querySelector('data-sound-clap');
    boomSound = document.querySelector('data-sound-boom');
}