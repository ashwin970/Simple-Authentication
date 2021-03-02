const bcrypt = require('bcrypt');

// const hashPassword = async(pw) =>{
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw,salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async(pw) =>{
    const hash = await bcrypt.hash(pw,10);
    console.log(hash);
}

const login = async(pw, hashedpw)=>{
    const result = await bcrypt.compare(pw, hashedpw);
    if(result){
        console.log("made it");
    }else{
        console.log('incorrect');
    }

}
// hashPassword('friends');
login('friends','$2b$10$clsAL5aQAGcXzdHKYjh53OzkyB/.gzt0ToBdM9ya44Lewq2X1xaii')