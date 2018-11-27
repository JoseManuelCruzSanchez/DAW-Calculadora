let modoFuncionesCanvasActivado = false;
let operacion = '';
let x = '';
let y = '';
let anguloTipo = 'radianes';

let salida = document.querySelector('#salidaDatos');
salida.value = 0;

function resetearTodo(){
    if(modoFuncionesCanvasActivado){
        operacion = '';
        x = '';
        salida.value = 'F(x) = ';/**********************************RESETEO CANVAS***********************************/
        canvasEnBlancoConEjesHorizontalYVertical(true);
    }else{
        operacion = '';
        x = '';
        y = '';
        salida.value = 0;
    }
}

function resetearVariables(resultado){
    operacion = '';
    if(isNaN(resultado)){
        x = '';
    }else{
        x = resultado;
    }
    y = '';
}

let c = document.getElementById("cv");
let ctx = c.getContext("2d");
function canvasEnBlancoConEjesHorizontalYVertical(vieneDeBotonResetearTodo) {
    if(vieneDeBotonResetearTodo){
        ctx.translate(-324.5,-157.5);
    }
    ctx.fillStyle="#ceffca";
    ctx.fillRect(0,0,649,314);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#009900';
    /*Linea verde horizontal*/
    ctx.moveTo(0, 157.5);
    ctx.lineTo(649, 157.5);
    ctx.stroke();
    /*Linea verde vertical*/
    ctx.moveTo(324.5, 0);
    ctx.lineTo(324.5, 314);
    ctx.stroke();
    ctx.translate(324.5,157.5);/*Trasladamos la coordenada 0,0*/
}
canvasEnBlancoConEjesHorizontalYVertical();

function representarGraficaCanvas(funcion, paso, xCotaInferior, xCotaSuperior) {
    if(funcion === 'F(x) = sen(x)'){
        for(let i = xCotaInferior; i < xCotaSuperior; i++){
            let i_mas1 = i+1;
            let y = -(Math.sin(i));
            let y_mas1 = -(Math.sin(i_mas1));
            pintarLinea(i*paso, y*paso, (i+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
        }
    }
    else if(funcion === 'F(x) = cos(x)'){
        for(let i = xCotaInferior; i < xCotaSuperior; i++){
            let i_mas1 = i+1;
            let y = -(Math.cos(i));
            let y_mas1 = -(Math.cos(i_mas1));
            pintarLinea(i*paso, y*paso, (i+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
        }
    }
    else if(funcion === 'F(x) = tan(x)'){
        for(let i = xCotaInferior; i < xCotaSuperior; i = i + 0.1){
            let i_mas1 = i+1;
            let y = -(Math.tan(i));
            let y_mas1 = -(Math.tan(i_mas1));
            pintarLinea(i*paso, y*paso, (i+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
        }
    }
    else if(funcion === 'F(x) = log(x)'){
        for(let i = xCotaInferior; i < xCotaSuperior; i++){
            let i_mas1 = i+1;
            let y = -(Math.log(i));
            let y_mas1 = -(Math.log(i_mas1));
            pintarLinea(i*paso, y*paso, (i+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
        }
    }
    else if(funcion === 'F(x) = √x'){
        for(let i = xCotaInferior; i < xCotaSuperior; i++){
            let i_mas1 = i+1;
            let y = -(Math.sqrt(i));
            let y_mas1 = -(Math.sqrt(i_mas1));
            pintarLinea(i*paso, y*paso, (i+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
        }
    }
    else if(funcion !== 'F(x) = '){/*Si hay funcion de tipo algebraica*/
        let expAlgebraica = funcion.substring(7);

        for(let x = xCotaInferior; x < xCotaSuperior; x++){/*Recorre los valores de x uno a uno*/
            let x_mas1 = x+1;
            let y = -(resultadoSumarExpresionAlgebraica(x, expAlgebraica));
            let y_mas1 = -(resultadoSumarExpresionAlgebraica(x_mas1, expAlgebraica));
            pintarLinea(x*paso, y*paso, (x+1)*paso, (y_mas1)*paso, '#f21d00');/*La y es negativa porque sino va hacia abajo*/
            //console.log('x ' + x);
            //console.log('x_mas1 ' + x_mas1);
            //console.log('y ' + y);
            //console.log('y_mas1 ' + y_mas1);
            console.log('**********************')
        }
    }
}

function resultadoSumarExpresionAlgebraica(valorX, expAlgebraica) {/*x valor eje x en un momento dado del bucle*/
    console.log("Expresion algebraica: "+ expAlgebraica);
    let resultado = 0;
    let arrayTotal = [];

    let ultimoCorte = 0;/*Donde acaba un polinomio, encontramos un - o un +*/
    if(expAlgebraica.indexOf('-') === -1 && expAlgebraica.indexOf('+') === -1){/*Solo contiene un polinomio*/
        /*No hay ni - ni +*/            /**************************************************************************/
        /*evaluamos*/                   /************************   SI TIENE SIGNO AL PRINCIPIO   *****************/
        arrayTotal.push(evaluarPolinomio(valorX, expAlgebraica));
    }else{
        for(let i = 0; i < expAlgebraica.length; i++){
            if((expAlgebraica[i] === '-' || expAlgebraica[i] === '+') && i !== 0){
                if(expAlgebraica[i-1] !== '^'){
                    arrayTotal.push(evaluarPolinomio(valorX, expAlgebraica.substring(ultimoCorte, i)));
                    ultimoCorte = i;
                }
            }
        }
        /*Para coger el polinomio mas a la derecha que el bucle se lo deja sin coger*/
        arrayTotal.push(evaluarPolinomio(valorX, expAlgebraica.substring(ultimoCorte)));
    }
    console.log("Suma expresion algebraica: " + arrayTotal.reduce(function(a, b){ return a + b; }));
    return arrayTotal.reduce(function(a, b){ return a + b; });/*Sumamos todos los elementos del array*/
}

function evaluarPolinomio(valorX, polinomio) {
    let resultado = 0;
    if(polinomio.indexOf('X') !== -1){/*Contiene X*/
        if(polinomio === 'X'){
            resultado = valorX;
        }
        else if(polinomio.indexOf('^') !== -1){/*Contiene ^*/
            let numIzq = polinomio.substring(0, polinomio.indexOf('X'));
            let numPot = Number(polinomio.substring(polinomio.indexOf('^')+1));
            console.log(numIzq + " POT " + numPot)
            if(numIzq === '-' || numIzq === '+'){/*es un - o un +*/
                if(numIzq === '-'){
                    resultado = -(Math.pow(valorX, numPot));
                }else{
                    resultado = Math.pow(valorX, numPot);
                }
            }else{
                if(numIzq === ''){
                    resultado = Math.pow(valorX, numPot);
                }else{
                    resultado = Number(numIzq) * (Math.pow(valorX, numPot));
                }
            }
        }else{/*No contiene ^*/
            let numIzq = polinomio.substring(0, polinomio.indexOf('X'));
            if(numIzq === '-' || numIzq === '+'){/*es un - o un +*/
                if(numIzq === '-'){
                    resultado = -(1 * valorX);
                }else{
                    resultado = valorX;
                }
            }else{
                resultado = Number(numIzq) * valorX;
            }
        }
    }else{/*No contiene X*/
        if(polinomio.indexOf('^') !== -1){/*Contiene ^*/
            let numIzq = Number(polinomio.substring(0, polinomio.indexOf('^')));
            let numDrch = Number(polinomio.substring(polinomio.indexOf('^')+1));
            resultado = Math.pow(numIzq, numDrch);
        }else{/*No contiene ^*/
            resultado = Number(polinomio);
        }
    }
    console.log("Polinomio: " + polinomio + " = " + resultado);
    return resultado;
}

function pintarLinea(desdeX, desdeY, hastaX, hastaY, color){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(desdeX, desdeY);
    ctx.lineTo(hastaX, hastaY);
    ctx.stroke();
}

function clickado(o){
    let btn = o.dataset.valor;
    /***********************************************************************************************************
     *************  CANVAS    CANVAS    CANVAS    CANVAS    CANVAS    CANVAS    CANVAS    CANVAS  **************
     **********************************************************************************************************/
    if(modoFuncionesCanvasActivado){/*Estamos en display de funciones en canvas*/
        if(btn === 'FUNCIONES'){/*Si pulsa el boton funciones volvemos a modo cientifica y ocultamos todoo relativo a canvas*/
            modoFuncionesCanvasActivado = false;
            document.getElementById('contenedor').className = 'contenedor-cientifica';
            document.getElementById('modoCalculadora').disabled = false;
            let btnsCanvas = document.getElementsByClassName('canvas');
            for(let i = 0; i < btnsCanvas.length; i++){
                btnsCanvas[i].style.display = 'none';
            }
            let botnsCanvas = Array.from(document.getElementsByClassName('uso-canvas'));
            for(let i = 0; i < botnsCanvas.length; i++){
                botnsCanvas[i].classList.remove('canvas-color-activado');
            }
            resetearTodo();
        }/*******************************  REPRESENTAR GRAFICA  *************************************************************************/
        else if(btn === '='){/*************************************************************************************************************************/
            representarGraficaCanvas(salida.value, 5, -500, 500);
        }
        else if(btn === 'CANVAS_SEN(X)'){
            if(salida.value === 'F(x) = '){
                salida.value += o.innerHTML;
            }
        }
        else if(btn === 'CANVAS_COS(X)'){
            if(salida.value === 'F(x) = '){
                salida.value += o.innerHTML;
            }
        }
        else if(btn === 'CANVAS_TAN(X)'){
            if(salida.value === 'F(x) = '){
                salida.value += o.innerHTML;
            }
        }
        else if(btn === 'CANVAS_LOG(X)'){
            if(salida.value === 'F(x) = '){
                salida.value += o.innerHTML;
            }
        }
        else if(btn === 'CANVAS_RAIZ'){
            if(salida.value === 'F(x) = '){
                salida.value += o.innerHTML;
            }
        }else{/*Resto elmentos que son: Números, X, +, ^ */
            if(btn === '0' || btn === '1' || btn === '2' || btn === '3' || btn === '4' || btn === '5' || btn === '6' || btn === '7' || btn === '8' || btn === '9'){
                if(salida.value[salida.value.length-1] !== 'X'){
                    salida.value += btn;
                }
            }
            else if(btn === 'CANVAS_X'){
                if(salida.value[salida.value.length-1] !== '^' && salida.value[salida.value.length-1] !== 'X'){
                    salida.value += 'X';
                }
            }
            else if(btn === 'CANVAS_+'){
                if(salida.value[salida.value.length-1] !== '^'){
                    salida.value += '+';
                }
            }
            else if(btn === 'CANVAS_^'){
                if(salida.value[salida.value.length-1] === 'X'){
                    salida.value += '^';
                }
            }
            else if(btn === '-'){
                console.log("pulsa boton menos");
                console.log(salida.value[salida.value.length-1]);
                console.log("pulsa boton menos");
                if(!isNaN(Number(salida.value[salida.value.length-1])) || salida.value[salida.value.length-1] === '^'){/*No meter un negativo detras de un número*/
                    salida.value += '-';
                }
            }
        }
        /***********************************************************************************************************
         ****************  CALCULADORA NORMAL O CIENTIFICA  ********************************************************
         **********************************************************************************************************/
    }else{
        if(btn === "/" || btn === "*" || btn === "-" || btn === "+" || btn === 'POTENCIA' || btn === 'RAIZN'){
            if(x[x.length-1] !== '.'){/*No permitir guardar una operación si hay '0.'*/
                if(btn !== '-'){/*Cualquiera menos el - */
                    if(y === ''){
                        operacion = btn;
                        if(salida.value === '0'){/*Operación con el 0 en pantalla*/
                            x = '0';
                        }
                    }
                }
                else if(btn === '-' && salida.value === '0' && operacion === ''){/*GUARDO EN x el negativo*/
                    x = btn;
                    salida.value = x;
                }
                else if(btn === '-' && operacion !== ''){/*GUARDO EN y el negativo*/
                    if(y === ''){/*Si aun no se ha guardado un numero en y se guarda un negativo*/
                        y = btn;
                        salida.value = y;
                    }
                }
                else{
                    operacion = btn;
                }
            }
        }
        else if(btn === 'ABS'){
            salida.value = 1*Math.abs(Number(salida.value)).toFixed(12);
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'SEN'){
            if(anguloTipo === 'grados'){
                salida.value = 1*Math.sin(Number(salida.value)*Math.PI/180).toFixed(12);
            }else{
                salida.value = 1*Math.sin(Number(salida.value)).toFixed(12);
            }
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'COS'){
            if(anguloTipo === 'grados'){
                salida.value = 1*Math.cos(Number(salida.value)*Math.PI/180).toFixed(12);
            }else{
                salida.value = 1*Math.cos(Number(salida.value)).toFixed(12);
            }
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'TAN'){
            if(anguloTipo === 'grados'){
                salida.value = 1*Math.tan(Number(salida.value)*Math.PI/180).toFixed(12);
            }else{
                salida.value = 1*Math.tan(Number(salida.value)).toFixed(12);
            }
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'SQRT'){
            salida.value = 1*Math.sqrt(Number(salida.value)).toFixed(12);
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'LOG10'){
            salida.value = 1*Math.log10(Number(salida.value)).toFixed(12);
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }else if(btn === 'LOG2'){/* Hablado con M.A. */
            salida.value = 1*Math.log2(Number(salida.value)).toFixed(12);
            isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
        }
        else if(btn === 'RADIANES'){
            anguloTipo = 'radianes';
            o.style.backgroundColor = '#F23A72';
            document.getElementById('grados').style.backgroundColor = 'grey';
        }
        else if(btn === 'GRADOS'){
            anguloTipo = 'grados';
            o.style.backgroundColor = '#F23A72';
            document.getElementById('radianes').style.backgroundColor = 'grey';
        }
        else if(btn === 'FUNCIONES'){
            if(!modoFuncionesCanvasActivado){/*Activamos display canvas y botones asociados*/
                modoFuncionesCanvasActivado = true;
                document.getElementById('contenedor').className = 'contenedor-cientifica-canvas';
                document.getElementById('modoCalculadora').disabled = true;
                let btnsCanvas = document.getElementsByClassName('canvas');
                for(let i = 0; i < btnsCanvas.length; i++){
                    btnsCanvas[i].style.display = 'block';
                }
                salida.value = 'F(x) = ';
                darColorBotonesActivosCanvas();
            }
        }
        else if(btn === '.'){
            if(operacion === ''){/*En 1º o 2º cajón*/
                if(x.indexOf('.') === -1){
                    if(x === ''){
                        x += '0.';
                        salida.value = x;
                    }else{
                        x += '.';
                        salida.value = x;
                    }
                }
            }else{
                if(y.indexOf('.') === -1){
                    if(y === ''){
                        y += '0.';
                        salida.value = y;
                    }else{
                        y += '.';
                        salida.value = y;
                    }
                }
            }
        }
        else if(btn === '='){
            if(operacion !== '' && x !== '' && y !== ''){
                if(operacion === '/'){
                    salida.value = 1*dividir(parseFloat(x), parseFloat(y)).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
                else if(operacion === '*'){
                    salida.value = 1*multiplicar(parseFloat(x), parseFloat(y)).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
                else if(operacion === '-'){
                    salida.value = 1*restar(parseFloat(x), parseFloat(y)).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
                else if(operacion === '+'){
                    salida.value = 1*sumar(parseFloat(x), parseFloat(y)).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
                else if(operacion === 'POTENCIA'){
                    salida.value = 1*Math.pow(x, y).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
                else if(operacion === 'RAIZN'){
                    salida.value = 1*Math.pow(x, (1/y)).toFixed(12);
                    isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                }
            }
        }
        else{/*es un numero*/
            if(operacion === ''){/*En 1º operando (x o y)*/
                if(btn === 'PI'){
                    if(x === ''){
                        x += Math.PI;
                        salida.value = x;
                    }
                }
                else if(btn === 'E'){
                    if(x === ''){
                        x += Math.E;
                        salida.value = x;
                    }
                }else if(btn === 'LN'){
                    if(x === ''){
                        x += Math.LN10;
                        salida.value = x;
                    }else{
                        x = Math.log(x);
                        salida.value = x;
                        isNaN(salida.value) ? resetearVariables('') : resetearVariables(salida.value);
                    }
                }else{
                    if(btn === '0'){/*para no meter 0's a cascoporro*/
                        if(x === '0'){
                            x = btn;
                            salida.value = x;
                        }else{
                            x += btn;
                            salida.value = x;
                        }
                    }else{/*nº diferente al 0*/
                        if(x === '0'){/*si hay un cero previo*/
                            x = btn;
                            salida.value = x;
                        }else{
                            x += btn;
                            salida.value = x;
                        }
                    }
                }
            }else{/*En 2º operando (x o y)*/
                if(btn === 'PI'){
                    if(y === ''){
                        y += Math.PI;
                        salida.value = y;
                    }
                }
                else if(btn === 'E'){
                    if(y === ''){
                        y += Math.E;
                        salida.value = y;
                    }
                }else if(btn === 'LOG10'){
                    if(y === ''){
                        y += Math.log(10);
                        salida.value = y;
                    }
                }else if(btn === 'LOG2'){
                    if(y === ''){
                        y += Math.log(2);
                        salida.value = y;
                    }
                }else if(btn === 'LN'){
                    if(y === ''){
                        y += Math.LN10;
                        salida.value = y;
                    }
                }else{
                    if(btn === '0'){/*para no meter 0's a cascoporro*/
                        if(y === '0'){
                            y = btn;
                            salida.value = y;
                        }else{
                            y += btn;
                            salida.value = y;
                        }
                    }else{/*nº diferente al 0*/
                        if(y === '0'){/*si hay un cero previo*/
                            y = btn;
                            salida.value = y;
                        }else{
                            y += btn;
                            salida.value = y;
                        }
                    }
                }
            }
        }
    }
}
function sumar(x, y){
    return x + y;
}

function restar(x, y){
    return x - y;
}

function multiplicar(x, y){
    return x * y;
}

function dividir(x, y){
    if(y !== 0){
        return x / y;
    }else{
        return 'no puede dividir por 0';
    }
}



function skin(o){
    document.getElementById('contenedor').style.backgroundColor = o.options[o.options.selectedIndex].value;
    let arrayBtns = document.getElementsByClassName('btn');
    if(o.options[o.options.selectedIndex].value === '#4E648E'){
        for(let i = 0; i < arrayBtns.length; i++){
            arrayBtns[i].style.color = 'white';
            arrayBtns[i].style.backgroundColor = '#152B55';
        }
        aplicaColorcitosBotonesRadianesGrados();
        document.getElementById('contenedor').style.boxShadow = '';
        if(modoFuncionesCanvasActivado){
            darColorBotonesActivosCanvas();
        }
    }
    else if(o.options[o.options.selectedIndex].value === '#805615'){
        for(let i = 0; i < arrayBtns.length; i++){
            arrayBtns[i].style.color = 'white';
            arrayBtns[i].style.backgroundColor = '#D4AB6A';
        }
        aplicaColorcitosBotonesRadianesGrados();
        document.getElementById('contenedor').style.boxShadow = '6px 9px 10px 0px #bfa6a6';
        if(modoFuncionesCanvasActivado){
            darColorBotonesActivosCanvas();
        }
    }
    else if(o.options[o.options.selectedIndex].value === '#577714'){
        for(let i = 0; i < arrayBtns.length; i++){
            arrayBtns[i].style.color = 'white';
            arrayBtns[i].style.backgroundColor = '#A7C763';
        }
        aplicaColorcitosBotonesRadianesGrados();
        document.getElementById('contenedor').style.boxShadow = '';
        if(modoFuncionesCanvasActivado){
            darColorBotonesActivosCanvas();
        }
    }
}

function darColorBotonesActivosCanvas() {
    let botnsCanvas = Array.from(document.getElementsByClassName('uso-canvas'));
    for(let i = 0; i < botnsCanvas.length; i++){
        botnsCanvas[i].classList.add('canvas-color-activado');
    }
}

function aplicaColorcitosBotonesRadianesGrados() {
    if(anguloTipo === 'radianes'){
        document.getElementById('radianes').style.backgroundColor = '#F23A72';
        document.getElementById('grados').style.backgroundColor = 'grey';
    }else{
        document.getElementById('radianes').style.backgroundColor = 'grey';
        document.getElementById('grados').style.backgroundColor = '#F23A72';
    }
}

function cambiarModo(o) {
    if(o.innerHTML === 'Cientifica'){
        o.innerHTML = 'Normal';
        let btnsOcultos = Array.from(document.getElementsByClassName('oculto'));
        for(let i = 0; i < btnsOcultos.length; i++){
            btnsOcultos[i].classList.add('mostrar');
            btnsOcultos[i].classList.remove('oculto');
        }
        document.getElementById('contenedor').className = 'contenedor-cientifica';
    }else{
        o.innerHTML = 'Cientifica';
        let btns = Array.from(document.getElementsByClassName('mostrar'));
        for(let i = 0; i < btns.length; i++){
            btns[i].classList.add('oculto');
            btns[i].classList.remove('mostrar');
        }
        document.getElementById('contenedor').className = 'contenedor-normal';
    }
}
