import React, { useEffect } from "react";
import Structure from "./site-structure";
import { Link } from "react-router-dom";
import Header from './header';

function PTMain() {
  useEffect(() => { document.body.style.background = "linear-gradient(178.87deg,#F5F9FD 24.14%,#D0DFF1 71.12%,#BED5F0 98.18%)";},[])

    return (
      <Structure>
          <Header/>
        <div className="row intro-space m-t-xl">
          <div className="col-xl-6 m-t-100 ">
            <h1 className="h1-t tblue intro-top">Placement <span className="spc">Test</span></h1>
          </div>
          <div className="col-xl-6 intro-top">
            <img alt="" className="responsive2" src="../img/imgL.svg" />
          </div>
        </div>
        <div className="row m-t-50">
          <div className="card m-auto main qcard">
            <div className="card-body text-center">
              <div className="col-sm-2 m-auto">
                <img alt="" className="m-t-80 responsive-lamp" src="../img/lamp.png" />
                </div>
                  <div className="m-t-50 mb-5">
                    <div className="col-sm-8 m-auto">
                      <p className="p2">
                        Esse teste foi elaborado para avaliar sua proficiência na
                        língua Inglesa a partir dos seis níveis internacionais do
                        Quadro Comum Europeu: A1, A2, B1, B2, C1 e C2. Para isso, há
                        três importantes passos.
                      </p>
                    </div>
                  </div>
              <div className="row justify-content-center">
                <div className="col-xl-3 h-400">
                  <div className="card qcard h-i">
                    <div className="card-body">
                      <h1 className="t-i">About the Test</h1>
                      <div className="h-card m-auto">
                        <img alt="" className="img-fluid quadro1" src="../img/wall.svg"/>
                      </div>
                      <div className="px-3">
                        <p className="p-main quadro1-p">
                          Antes de iniciar o teste, é importante que você
                          entenda cada etapa. Leia atentamente cada uma delas e
                          prossiga após tirar qualquer dúvida.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 h-400">
                  <div className="card qcard h-i">
                    <div className="card-body">
                    <h1 className="t-i">Practice</h1>
                      <div className="responsive m-auto">
                        <img alt="" className="img-fluid quadro2" src="../img/chilld1.svg"/>
                      </div>
                      <div className="px-3">
                          <p className="p-main quadro2-p">
                            Simular é o melhor caminho. Vamos nos familiarizar com
                            o teste. Antes de começar entenda as estruturas das
                            perguntas, assim você estará mais preparado e o
                            resultado será mais preciso.
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 h-400">
                  <div className="card qcard h-i">
                    <div className="card-body">
                    <h1 className="t-i">Placement Test</h1>
                      <div className="responsive m-auto">
                        <img alt="" className="img-fluid quadro3" src="../img/monitor.svg" height="200"/>
                      </div>
                      <div className="px-3">
                          <p className="p-main quadro3-p">
                            Finalmente, uma vez preparado, aqui é onde você
                            iniciará o teste de fato. Quando começar, faça sem
                            interromper até a conclusão. Boa sorte!
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center m-t-30 ">
                <p className="txt-up font-11  m-t-xl">introdução</p>
              </div>
              <h1 className="f-p tblue text-center t1 ">Como funciona o teste ?</h1>
               <div className="col-sm-8 m-auto">
                  <p className="p2">
                    O teste é dividido em quatro partes, segundo as habilidades linguísticas
                    (ouvir, ler, escrever e falar), e entre cada uma delas haverá uma pequena pausa.
                  </p>
                </div>
            </div>
            <div className="col-10  m-auto">
              <div className="row m-t-80 ">
                  <div className="col-sm-7 m-auto m-l-20">
                    <img alt="" className="responsive" src="../img/livrosintro.svg"/>
                  </div>
                  <div className="col-xl-4 m-auto align-self-center">
                    <h4 className="tli cl-b">Listening </h4>
                      <p className="p2 text-left m-t-20 ">
                        Para avaliar sua habilidade de compreensão auditiva na língua inglesa,
                        o enunciado das questões será apresentado a partir de um áudio,
                        que após ouvi-lo, você deverá selecionar a alternativa correta, podendo 
                        ser imagens ou frases escritas.
                      </p>
                  </div>
              </div>
              <div className="row m-t-80 readi">
                <div className="col-xl-4 m-auto  align-self-center">
                  <h4 className="tli cl-o">reading/grammar</h4>
                    <p className="p2 text-left m-t-20">
                      Sua habilidade de leitura no idioma será avaliado a partir de 
                      diferentes estruturas de perguntas, todas com o enunciado 
                      apresentado por escrito. A resposta poderá ser de múltipla escolha
                      (com imagem ou frases), ou onde você deve completar  a frase corretamente.
                    </p>
                </div>
                <div className="col-sm-7 text-right m-auto m-l-20">
                  <img alt="" className="responsive" src="../img/wall.svg"/>
                </div>
              </div>
              <div className="row m-t-80 ">
                <div className="col-sm-7 m-auto m-l-20">
                  <img alt="" className="responsive" src="../img/fly.svg" />
                </div>
                <div className="col-xl-4  m-auto align-self-center">
                  <h4 className="tli cl-p">writing</h4>
                  <p className="p2 text-left m-t-20">
                    Avaliaremos sua habilidade de escrever pedindo simplesmente
                    para transcrever o que ouvir ou, a partir de uma pequena
                    leitura, faremos perguntas para você responder escrevendo.
                  </p>
                </div>
              </div>
              <div className="row m-t-80 speak">
                <div className="col-xl-4 m-auto align-self-center">
                  <h4 className="tli cl-g1">speaking </h4>
                    <p className="p2 text-left m-t-20">
                      A última etapa é a análise da sua capacidade de falar em
                      inglês. Você terá que ouvir o nativo e repetir em voz alta
                      exatamente a mesma frase, ou a partir de uma pergunta falada
                      (um áudio) e também alternativas por escrito, você deverá
                      gravar a frase que julgar correta.
                    </p>
                </div>
                <div className="col-sm-7 text-right m-auto m-l-20">
                  <img alt="" className="responsive" src="../img/boyfly.png"/>
                </div>
              </div>
            </div>
              <div className="col-sm-8 m-auto">
                <p className="m-t-50 m-b-30 p2 ">Chegou o momento de testarmos todas essas estruturas das questões. Ready?</p>
              </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <Link to={"../../warmup/1"} className="btn-big grad-mains">
                START PRACTICE
              </Link>
            </div>
          </div>
        </div>
      </Structure>
    );
  }
export default PTMain
