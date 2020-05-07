const nameValidation = (name)=>{
    let temp = ""+name;
    temp = temp.trim();
    if(temp.includes('0')||temp.includes('1')||temp.includes('2')||temp.includes('3')||temp.includes('4')||temp.includes('5')||temp.includes('6')||temp.includes('7')||temp.includes('8')||temp.includes('9')||temp.includes('_')||temp.includes('@')||temp.includes('-')||temp.includes('+')||temp.includes(')')||temp.includes('(')||temp.includes(' ')||temp===""){
        return false;
    }
    return true;
}
const validateEmail = (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export {
    nameValidation,
    validateEmail
}