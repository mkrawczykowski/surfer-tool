$( document ).ready(function() {
	let daneFrazy = $('#textarea-input-data');
	let daneFrazyDodatkowe = $('#textarea-input-dodatkowe');
	let licznikZnakow = document.querySelector('#licznik-znakow');
	let daneFrazyLinie = '';
	let daneFrazyLinieDodatkowe = '';
	let tekst = document.querySelector('#textarea-tekst');
	let listaFrazLiczby = document.querySelector('#lista-fraz-liczby');
	let listaFrazDodatkowe = document.querySelector('#lista-fraz-dodatkowe');
	//let wygodnaLista = document.querySelector('#wygodna-lista');
	var bazaFraz = [];


	daneFrazyDodatkowe.on('input', function(e){
		daneFrazyLinieDodatkowe = daneFrazyDodatkowe[0].value.replace(/\r\n/g,"\n").split("\n");

		for (i = 0; i < daneFrazyLinieDodatkowe.length; i++){
			var oczyszczonaFraza = '';
			var fraza = daneFrazyLinieDodatkowe[i];
			oczyszczonaFraza = fraza.substring(2, fraza.length);
			item = '<div class="lista-item"><span class="keyword">' + oczyszczonaFraza + '</span></div>';
			listaFrazDodatkowe.innerHTML += item;
		};
	});
	
    daneFrazy.on('input', function(e){
        console.log(daneFrazy[0].value);
        daneFrazyLinie = daneFrazy[0].value.replace(/\r\n/g,"\n").split("\n");
        
		

        for (i = 0; i < daneFrazyLinie.length; i++){
            var oczyszczono = '';
			var oczyszczonaIlosc = '';
			var oczyszczonaFraza = '';
			var oczyszczoneOd = '';
			var oczyszczoneDo = '';
			var nowaFrazaArr = [];
			var item = '';
            console.log('linia: ' + daneFrazyLinie[i]);
		    var gdzieDwukropek = daneFrazyLinie[i].indexOf(":");
			
			var fraza = daneFrazyLinie[i].substring(0,gdzieDwukropek);
			var ilosc = daneFrazyLinie[i].substring(gdzieDwukropek+1,daneFrazyLinie[i].length);
        
			console.log('fraza: ' + fraza);
			console.log('ilosc: ' + ilosc);						
			

			for (j = 0; j < ilosc.length; j++){
				if (ilosc[j] != ' '){
					oczyszczonaIlosc += ilosc[j];
				}
			}
			
			var gdzieMyslnik = oczyszczonaIlosc.indexOf("-");	

			oczyszczonaFraza = fraza.substring(2, fraza.length);

			console.log('oczyszczonaIlosc: ' + oczyszczonaIlosc);			
			console.log('oczyszczonaFraza: ' + oczyszczonaFraza);
			console.log('i: ' + i);
			oczyszczoneOd = oczyszczonaIlosc.substring(0,gdzieMyslnik);
			oczyszczoneDo = oczyszczonaIlosc.substring(gdzieMyslnik+1,oczyszczonaIlosc.length);
			nowaFrazaArr = [oczyszczonaFraza, '', oczyszczoneOd, oczyszczoneDo];
			bazaFraz.push(nowaFrazaArr);
			console.log(bazaFraz);
			
			item = '<div class="lista-item"><span class="keyword">' + oczyszczonaFraza + '</span><span class="numbers">0 | ' + oczyszczoneOd + ' - ' + oczyszczoneDo + '</span></div>';
			console.log(item);
			
			listaFrazLiczby.innerHTML += item;
		}
		
    });

	let tekstString;

	tekst.addEventListener('keyup', function(e){
		licznikZnakow.innerHTML = tekst.value.length;
	});
	
	tekst.addEventListener('keyup', function(e){
	var wierszBazy;	
	tekstString = tekst.value.toLowerCase();
	listaFrazLiczby.innerHTML = '';
	var kolor = '';
		for (m = 0; m < bazaFraz.length; m++){
			wierszBazy = bazaFraz[m];
			console.log('wierszBazy: ' + wierszBazy[0]);
			var regExp = new RegExp(wierszBazy[0], 'g');
			
			wierszBazy[1] = (tekstString.match(regExp) || []).length;
			console.log(wierszBazy);
			bazaFraz[m] = wierszBazy;
			console.log(bazaFraz);
			
			if (wierszBazy[1] <= wierszBazy[3] &&  wierszBazy[1] >= wierszBazy[2]){
				kolor = 'zielony';
			} else {
				if (wierszBazy[1] < wierszBazy[3]){
					kolor = 'pomaranczowy';
				} else {
					kolor = 'czerwony';
				}
			}
			
			item2 = '<div class="lista-item ' + kolor + '"><span class="keyword">' + wierszBazy[0] + '</span><span class="numbers">' + wierszBazy[1]  + ' | ' + wierszBazy[2] + ' - ' + wierszBazy[3] + '</span></div>';
			listaFrazLiczby.innerHTML += item2;
			console.log(item2);
			
		}
		
	});


});
 

