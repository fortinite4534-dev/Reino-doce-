const fases = [

/* ========= MUNDO 1 (1–20) ========= */
{numero:1,tipo:"pontos",alvo:1000,movimentos:20,recompensa:50},
{numero:2,tipo:"pontos",alvo:1200,movimentos:20,recompensa:50},
{numero:3,tipo:"coletar_morango",alvo:15,movimentos:18,recompensa:60},
{numero:4,tipo:"quebrar_blocos",alvo:10,movimentos:20,recompensa:60},
{numero:5,tipo:"especial",alvo:1,movimentos:18,recompensa:80},
{numero:6,tipo:"pontos",alvo:1500,movimentos:18,recompensa:70},
{numero:7,tipo:"coletar_uva",alvo:20,movimentos:20,recompensa:70},
{numero:8,tipo:"quebrar_blocos",alvo:15,movimentos:18,recompensa:80},
{numero:9,tipo:"pontos",alvo:1800,movimentos:18,recompensa:80},
{numero:10,tipo:"chefe",alvo:1,movimentos:25,recompensa:150},

/* ========= MUNDO 2 (11–20) ========= */
{numero:11,tipo:"pontos",alvo:2000,movimentos:18,recompensa:90},
{numero:12,tipo:"coletar_limao",alvo:25,movimentos:20,recompensa:90},
{numero:13,tipo:"quebrar_blocos",alvo:20,movimentos:18,recompensa:100},
{numero:14,tipo:"especial",alvo:2,movimentos:18,recompensa:110},
{numero:15,tipo:"pontos",alvo:2500,movimentos:18,recompensa:110},
{numero:16,tipo:"coletar_chocolate",alvo:20,movimentos:20,recompensa:120},
{numero:17,tipo:"quebrar_blocos",alvo:25,movimentos:18,recompensa:120},
{numero:18,tipo:"pontos",alvo:3000,movimentos:18,recompensa:130},
{numero:19,tipo:"especial",alvo:3,movimentos:18,recompensa:140},
{numero:20,tipo:"chefe",alvo:1,movimentos:25,recompensa:200},

/* ========= PADRÃO REPETE ATÉ 200 ========= */

];

for(let i=21;i<=200;i++){
    let tipoFase;
    if(i%20===0){
        tipoFase="chefe";
    }else if(i%5===0){
        tipoFase="especial";
    }else if(i%3===0){
        tipoFase="coletar_morango";
    }else if(i%4===0){
        tipoFase="quebrar_blocos";
    }else{
        tipoFase="pontos";
    }

    fases.push({
        numero:i,
        tipo:tipoFase,
        alvo:1000+(i*150),
        movimentos:20-(i%5),
        recompensa:50+(i*10)
    });
