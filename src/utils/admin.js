const getToValidate = (interpreters) => {
    const toValidate = interpreters.map(interpreter => {
        const unvalidatedCertificates = []

        interpreter.certifications.forEach(certificate => {
            if (!certificate.isValidated && !certificate.isRejected) {
                unvalidatedCertificates.push({
                    id: certificate.id,
                    title: certificate.title,
                    image: certificate.file.url
                })
            }
        })

        return {
            name: interpreter.name,
            avatar: interpreter.avatar.url,
            location: interpreter.location.locationString,
            unvalidatedCertificates: unvalidatedCertificates,
        }
    })

    return toValidate
}

module.exports = {
    getToValidate
}
