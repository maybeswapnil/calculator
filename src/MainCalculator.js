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
       

        setResult('')
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
        var l = value.join('');
        var res = addbits(l);
        if(!isNaN(res)) {
            setResult(res)
        }
        
    }

    function equals() {
        var m = memory;
        var l = value.join('');
        var res = addbits(l);
        if(!isNaN(res)) {
            setResult(res)
            m.push(value.join('') + ' = ' + res)
            setG(!g)
    
            setMemory(m)
        }
       
       
    }

    function addbits(expr) {
        console.log(expr)
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
        setG(!g)
        setHistory(!history)
    }

    function backFunction() {
        var m = value;
        m.pop()
        setValue(m)
        setG(!g)

        var l = value.join('');
        var res = addbits(l);
        if(!isNaN(res)) {
            setResult(res)
        } 
        else {
            var g = [...value]
            g.pop()
            console.log(g)
            var res = addbits(g.join(''));
            console.log(res)

            setResult(res)
        }
        setG(!g)
    }

    function functionCE() {
        var m = value;
        setG(!g)
       
        for(var h = m.length-1;h>=0 ;h--) {
            if(value[h] in {'/':'/', '-':'-', '+':'+', '*':'*'}) {
                var l = value.join('');
                var res = addbits(l);
                if(!isNaN(res)) {
                    setResult(res)
                }else {
                    var g = [...value]
                    g.pop()
                    console.log(g)
                    var res = addbits(g.join(''));
                    console.log(res)
        
                    setResult(res)
                }
                break;
            } else m.pop()
        }
        setValue(m)
    }

    function deleteHistory() {
        setMemory([])
    }

  return (
    <div className="calculator">
      <div id='width12'>
      <div className='title'>Standard</div>
      <div onClick={historyFunction}>
        <div id='ham'></div>
        <div id='ham'></div>
        <div id='ham'></div>
      </div>

      <table className='maintable' border="1">
         <tr>
            <td colSpan="3" id='maxwidth'><p id='result'>{value.join('')||'0'}</p><p id='result'>{result||0}</p></td>
            <td ><input type="button" value="c" id='clearButtons' onClick={clear}/>
            <input type="button" value="ce" id='clearButtons' onClick={functionCE}/>
            <input type="button" value="<-" id='clearButtons' onClick={backFunction}/>   </td>
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
      </div>
      <div>
      {history?<div className='history'>
          <h3>History</h3>
          <div id='hist'>
          {memory.map((r) => {
              return (
                  <p>{r}</p>
              )
          })}
          {memory.length===0?<h3>No history found!</h3>:null}
          </div>
          <button id='delete' onClick={deleteHistory}>Delete</button>
      </div>:null}
      </div>

    </div>
  );
}

export default MainCalculator;
