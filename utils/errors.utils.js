module.exports.signUpErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('email'))
        errors.email = "E-mail incorrect ou déjà pris."

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caracères minimum."

    if (err.code == 11000)
        errors.email = "Cet e-mail est déjà enregistré."

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('Email'))
        errors.email = 'Email inconnu';

    if (err.message.includes('Mot de passe'))
        errors.password = 'Le mot de passe n\'est pas bon.'

    return errors;
}

module.exports.uploadImageErrors = (err) => {
    let errors = { format: '', maxSize: '' }

    if (err.message.includes('invalid file')) errors.format = "Format incompatible"
    if (err.message.includes('max size')) errors.maxSize = "Le fichier est trop volumineux. (1Mo maximum)"

    return errors
}