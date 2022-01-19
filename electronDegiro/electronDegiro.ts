import { ipcMain } from "electron";
import DeGiro , { DeGiroEnums, DeGiroTypes } from 'degiro-api'
import { UserStockIndexPosition } from "../src/app/interfaces/datos";
const {DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes, PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums


process.env['DEGIRO_DEBUG']="1";


let degiro : DeGiro;

let promiseExecuter = async (promise:Promise<any>) =>
{

        try {
            await promise
            return 1;
        } catch (error) {
            console.log("error:", error)
            return -1;
        }

}

let getPromiseExecuter = async (promise:Promise<any>) =>
{

        try {
            return await promise;
             
        } catch (error) {
            console.log("error:", JSON.stringify(error))
            return undefined;
        }

}


ipcMain.handle('login', async (event, username:string, pwd:string) => {
    // ... hacer acciones en el nombre del Renderer
    degiro = new DeGiro({ username: username, pwd: pwd }); // <-- Using ENV variables

    return  await promiseExecuter(degiro.login());

  });

ipcMain.handle('reLogin', async (event) => {
    if(!degiro)
    {
        return -1;
    }
    
    return  await promiseExecuter(degiro.login());
    
  });
ipcMain.handle('logout', async (event) => {
    
    if(!degiro)
    {
        return -1;
    }
    let res = await promiseExecuter(degiro.logout());
    degiro =undefined;

    return  res;
    
  });
ipcMain.handle('isLogin', async (event) => {
    // ... hacer acciones en el nombre del Renderer

        if(!degiro)
        {
            return false;
        }

        
        return await degiro.isLogin({ secure: true });
});

ipcMain.handle('getPosicionAbierta', async (event, idIndexDeGiro) => {
    // ... hacer acciones en el nombre del Renderer
    if(!degiro)
    {
        return false;
    }
    

    let res : Array<UserStockIndexPosition> =  await getPromiseExecuter(degiro.getPortfolio({ 
        type: PORTFOLIO_POSITIONS_TYPE_ENUM.OPEN, 
        getProductDetails: true,
      }))

     return res ? res.filter(v => v.productData.id === idIndexDeGiro) : undefined;
    
});


ipcMain.handle('getActiveOrders', async (event, idIndexDeGiro) => {
    // ... hacer acciones en el nombre del Renderer
    if(!degiro)
    {
        return false;
    }
    
    let options: DeGiroTypes.GetOrdersConfigType = {
        active: true,
        lastTransactions: false
      }
    
    let res : DeGiroTypes.GetOrdersResultType =  await getPromiseExecuter(degiro.getOrders(options));

     return res;
    
});



ipcMain.handle('ventaPrecioMercado', async (event, idIndexDeGiro :string, size:number) => {
    // ... hacer acciones en el nombre del Renderer
    if(!degiro)
    {
        return -1;
    }
    
    const order: DeGiroTypes.OrderType = {
        buySell: DeGiroActions.SELL,
        orderType: DeGiroMarketOrderTypes.MARKET,
        productId: idIndexDeGiro, // $AAPL - Apple Inc
        size: size,
        timeType: DeGiroTimeTypes.DAY
        // price: 270, limit price
        // stopPrice: 2,
      }
      console.log("vender a", order)
      const resultado : DeGiroTypes.CreateOrderResultType =   await getPromiseExecuter(degiro.createOrder(order));

      if(!resultado)
      {
          console.log("ERROR AL INTENTAR EJECUTAR ORDEN")
          return -1;
      }

      await tiempoEspera();
      //tiempo entre medias

      const orderId = await getPromiseExecuter(degiro.executeOrder(order, resultado.confirmationId));
      if(!orderId)
      {
          console.log("ERROR AL INTENTAR confirmar ORDEN")
          return -1;
      }
     return orderId;
    
});


let timeOutGeneric = (baseTime :number, maxRandomOffsetTime : number, fn : ()=>void) =>
{

  let time =  baseTime+ Math.random() * maxRandomOffsetTime; //humanizar bot

  return setTimeout(fn, time)


}

let tiempoEspera = (tiempo ?: number)=>
{

      return new Promise<void>((resolve, reject)=>{

         timeOutGeneric(tiempo || 1000, 0, ()=>resolve())
      })


}