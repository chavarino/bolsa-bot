import { Observable } from 'rxjs';
import { IndiceValor, StockDataStream, TipoDatoInvesting } from '../interfaces/datos';





  


export class MockStockDataStream implements StockDataStream {
  private intervalId:any;
  private stream: Observable<IndiceValor>;
  private lista : IndiceValor[] = []

constructor(lista : IndiceValor[])
{
    this.lista = lista;
}
  setStockIndexId (id: string){

    
  }
  getStream()
  {
    if(!this.stream)
        this.stream = new Observable<IndiceValor>((s)=>{

            this.intervalId =setInterval(()=>{
            let lastValueIndex = this.lista.shift();

            if(lastValueIndex)
            {
                lastValueIndex.low = lastValueIndex.low.replace(",", ".");
                lastValueIndex.high = lastValueIndex.high.replace(",", ".");
                lastValueIndex.tipoDato = TipoDatoInvesting.MOCK
                s.next(lastValueIndex);

            }

            }, 1500);



            
        })
    return this.stream;  
    
  }
  close()
  {

           
        clearInterval(this.intervalId);
        
          this.stream =null;
  }


}
export class RealStockDataStream implements StockDataStream {
    private stream: Observable<IndiceValor>;
    idChanged: boolean;
  

    constructor(id: string) {

        this.id = id;
    }
    private id: string;
    private socket: WebSocket;
    private isClosing: boolean = false;
    
    setStockIndexId(id: string) {

        this.idChanged =true;
        this.id = id;
    }

    getStream() {

        if (!this.stream)
            this.stream = this.getRealTimeData();
        return this.stream;
    }


    close() {

        this.isClosing = true;

        this.socket.close();
        this.stream = null;
    }


    private iniSocket(url: string, fnOnOpen: (this: WebSocket, ev: Event) => any, fnOnMessage: (this: WebSocket, ev: Event) => void,
        fnOnClose: (this: WebSocket, ev: Event) => void, fnError: (this: WebSocket, error: Event) => any): WebSocket {

        console.log("[iniSocket] ", url);
        var socket = new WebSocket(url);

        socket.onopen = fnOnOpen;

        socket.onmessage = fnOnMessage;

        socket.onclose = fnOnClose;

        socket.onerror = fnError;


        this.socket = socket;
        return socket;
    }

    getRealTimeData( ): Observable<IndiceValor> {


     

        let url: string = "wss://stream10.forexpros.com/echo/019/vjcge6k3/websocket";
        let getId = ()=>this.id;
        let vm=this;
        let fnOnOpen: (this: WebSocket, ev: Event) => any = function (e) {

            if (this.readyState === WebSocket.OPEN) {
                let a = ['{"_event":"bulk-subscribe","tzID":58,"message":"pid-eu-32180:%%pid-eu-13809:%%pid-eu-474:%%pid-eu-462:%%pid-eu-959215:%%pid-eu-469:%%pid-eu-446:%%pid-eu-32268:%%pid-eu-473:%%pid-eu-463:%%pid-eu-32180:%%pid-eu-453:%%pid-eu-174:%%pid-eu-8839:%%pid-eu-8874:%%pid-eu-169:%%pid-eu-172:%%pid-eu-8827:%%pid-eu-956731:%%pid-eu-457:%%pid-eu-6408:%%pid-eu-6369:%%pid-eu-28547:%%pidTechSumm-474:%%pidTechSumm-446:%%pidTechSumm-469:%%pidTechSumm-457:%%pidTechSumm-463:%%pidTechSumm-6408:%%pidTechSumm-6369:%%pidExt-eu-13809:%%isOpenExch-11:%%isOpenExch-1:%%isOpenExch-4:%%isOpenExch-1002:%%isOpenPair-8839:%%isOpenPair-8874:%%isOpenPair-8827:%%cmt-4-5-13812:%%domain-4:"}'];

                console.log("Suscription Sended");

                this.send(JSON.stringify(a));
            }
        };

        let fnOnMessage: (this: WebSocket, event: Event) => any;

        let fnOnClose: (this: WebSocket, event: Event) => any;
        let fnOnError: (this: WebSocket, event: Event) => any = function (error) {
            console.log(`[error] ${error["message"]}`);
        };
        let iniSocket = () => {
            this.iniSocket(url, fnOnOpen, fnOnMessage, fnOnClose, fnOnError);
        };
        fnOnClose = (event) => {
            console.log('[close] Connection died', event["reason"]);
            if (!this.isClosing) {
                iniSocket();

            }
        };

        return new Observable<IndiceValor>(s => {

            fnOnMessage = function (event) {
                
                if (event["data"] !== "o") {
                    let jsonIn = JSON.parse(event["data"].substring(1));
                    let indice = JSON.parse(jsonIn[0]);
                    //message: 'pid-eu-8874::
                    let id = `pid-eu-${getId()}::`;
                
                    let lastValueIndex: IndiceValor;
                  
                        if (indice.message && indice.message.includes(id) && (lastValueIndex = JSON.parse(indice.message.replace(id, "")))) {
                        
                           
                                
                                lastValueIndex.low = lastValueIndex.low.replace(",", ".");
                                lastValueIndex.high = lastValueIndex.high.replace(",", ".");
                                lastValueIndex.tipoDato = TipoDatoInvesting.REAL
                                //envia siguiente valor
                                s.next(lastValueIndex);
                            
                        }
                        else if(vm.idChanged){
                            
                            s.next({
                                    tipoDato: TipoDatoInvesting.NS
                            } as IndiceValor)
                            vm.idChanged =false;
                        }
                        
                    

                }
            };


            iniSocket();



        });


    }
}
