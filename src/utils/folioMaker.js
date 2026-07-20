
const application_type_prefix = {
    EVENTS: "EVT",
    PYROTECHNICS: "PIR",
    BUSSINESS_REGISTRATION: "NEG",
    RESIDENCY: "RES"
}

export async function createFolio(applicationType, count){
    const prefix = application_type_prefix[applicationType] ?? "TRM"
    const year = new Date().getFullYear()
    const sequence = String(count + 1).padStart(5, "0")

    return `${prefix}-${year}-${sequence}`
}