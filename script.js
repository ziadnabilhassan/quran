let sel3=document.getElementById('sel3');
let audio=document.getElementById('audio');
async function data(){
    const sel1=document.getElementById('sel1');
    const res= await fetch('https://mp3quran.net/api/v3/reciters?language=eng');
    const data=await res.json();
    sel1.innerHTML +=`<option value=""></option>`;
    data.reciters.forEach(reciter => {
        sel1.innerHTML +=`<option value="${reciter.id}">${reciter.name}</option>`;
        
    });
    sel1.addEventListener('change',e=> getmoshaf(e.target.value))
}
data()


async function getmoshaf(reciter){
    const sel2=document.getElementById('sel2');
    const res= await fetch(`https://www.mp3quran.net/api/v3/reciters?language=eng&reciter=${reciter}`);
    const data=await res.json();
    sel2.innerHTML +=`<option value=""></option>`;
    data.reciters[0].moshaf.forEach(moshaf => {
        sel2.innerHTML +=`<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}" >${moshaf.name}</option>`;
        
    });
    sel2.addEventListener('change',e => {
        const selectedMosfah = sel2.options[sel2.selectedIndex]
        const surahserver = selectedMosfah.dataset.server;
        const surahList = selectedMosfah.dataset.surahlist;
        getsurah(surahserver,surahList)

    } )

}
async function getsurah(surahserver,surahList){
    const sel3=document.getElementById('sel3');
    const res= await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data= await res.json();
    const surahNames=data.suwar;
    surahList=surahList.split(',');
    // console.log(surahList);
    sel3.innerHTML +=`<option value=""></option>`;
    surahList?.map(surah=>{
        const padSurah=surah.padStart(3, '0');
        surahNames.forEach(surahName=>{
            if(surahName.id == surah){
                sel3.innerHTML +=`<option value="${surahserver}${padSurah}.mp3">${surahName.name}</option>`;
            }
        })
        
    })
    sel3.addEventListener('change',e=>{
        const selectedsurah = sel3.options[sel3.selectedIndex];
playsurah(selectedsurah.value)
    } )
}
function playsurah(surahMP3){
    audio.src=surahMP3;
    audio.play();
}

