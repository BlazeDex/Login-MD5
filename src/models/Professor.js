const { Schema, model} = require('mongoose');

const ProfessorSchema= new Schema({
    name: { 
        type: String, 
        required: true
    },
    lastName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    isProfessor: { 
        type: Boolean, 
        default: true
    },
    isAdmin: { 
        type: Boolean, 
        default: false
    },
    password: { 
        type: String, 
        required: true
    }    
}, {
    timestamps: true
});

ProfessorSchema.methods.encryptPassword = function (password) {
    return password;
};

ProfessorSchema.methods.matchPassword = async function (password) {
    const encryptPassword = this.password;
    const hashedPassword = password;
    return await encryptPassword === hashedPassword;
}

module.exports = model('Professor', ProfessorSchema);