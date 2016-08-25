import history from '../history';

export function go(myPath) {
    history.push(myPath)
}

export function goOr(condition, r1, r2) {
    if(condition){
      go(r1);
    }else{
      go(r2);
    }
}
