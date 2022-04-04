import './App.css';
import React, {useState, useEffect, useCallback, memo} from 'react';

function MainCalculator() {
    const [value, setValue] = useState([''])
    const [history, setHistory] = useState(false)
    const [g, setG] = useState(false)
    const [memory, setMemory] = useState([])
    const [result, setResult] = useState(0)

    function clear() {
        setValue([])
    }

    function addValues(e) {
         
        // if(e.target.value in {'/':'/', '-':'-', '+':'+', '*':'*'}) {
        //     console.log('!!!!!!!')

        // }
        // else {
            var m = value;
            m.push(e.target.value)
            setG(!g)

            setValue(m)

        //}
        console.log(value)
        
    }

    function equals() {
        var m = memory;
        var l = value.join('');
        var res = addbits(l);
        console.log(res)
        setResult(res)
        m.push(value.join('') + ' = ' + res)
        setMemory(m)
        console.log(memory)

    }

    function addbits(expr) {
        var chars = expr.split("");
        var n = [], op = [], index = 0, oplast = true;
        n[index] = "";
        for (var c = 0; c < chars.length; c++) {

            if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
                op[index] = chars[c];
                index++;
                n[index] = "";
                oplast = true;
            } else {
                n[index] += chars[c];
                oplast = false;
            }
        }
        expr = parseFloat(n[0]);
        for (var o = 0; o < op.length; o++) {
            var num = parseFloat(n[o + 1]);
            switch (op[o]) {
                case "+":
                    expr = expr + num;
                    break;
                case "-":
                    expr = expr - num;
                    break;
                case "*":
                    expr = expr * num;
                    break;
                case "/":
                    expr = expr / num;
                    break;
            }
        }
        return expr;
    }

    function historyFunction() {
        console.log(history)
        setHistory(!history)
    }

    function functionCE() {
        var m = value;
        setG(!g)

        for(var h = m.length-1;h>=0 ;h--) {
            if(value[h] in {'/':'/', '-':'-', '+':'+', '*':'*'}) {
                m.pop()
                break;
            } else {
                m.pop()
                console.log(m)
            }
            
        }
        setValue(m)
    }

  return (
    <div className="App">
   
      <body>
      <div className='title'>Standard</div>
      <div onClick={historyFunction}>
        <div id='ham'></div>
        <div id='ham'></div>
        <div id='ham'></div>
      </div>
      <table border="1">
         <tr>
            <td colspan="3"><p id='result'>{value.join('')||'Empty'}</p><p id='result'>{result}</p></td>
            <td><input type="button" value="c" onClick={clear}/>
            <input type="button" value="ce" onClick={functionCE}/>  </td>
         </tr>
         <tr>
       
            <td><input type="button" value="1" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="2" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="3" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="/" onClick={(e) => addValues(e)}/> </td>
         </tr>
         <tr>
            <td><input type="button" value="4" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="5" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="6" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="-" onClick={(e) => addValues(e)}/> </td>
         </tr>
         <tr>
            <td><input type="button" value="7" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="8" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="9" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="+" onClick={(e) => addValues(e)}/> </td>
         </tr>
         <tr>
            <td><input type="button" value="." onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="0" onClick={(e) => addValues(e)}/> </td>
            <td><input type="button" value="=" onClick={equals}/> </td>
            <td><input type="button" value="*" onClick={(e) => addValues(e)}/> </td>
         </tr>
      </table>
      {history?<div className='history' style={{color: 'black'}}>
          <h3>History</h3>
          {memory.map((r) => {
              return (
                  <p>{r}</p>
              )
          })}
      </div>:null}
   </body>
    </div>
  );
}

export default MainCalculator;
