export function authorization(...allowedRoles){
    return (req, res, next) => {
        try {

            console.log(req.user.id)
            console.log(req.user.role)
            
            if(!req.user) {
                return res.status(401).json({
                    message: 'No autenticado'
                })
            }

            if(!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: 'No tienes permisos para acceder a este recurso'
                })
            }

            //cambiar a un middleware si se quier ser mas especifico
            if(!req.user.canReport) {
                 return res.status(403).json({
                    message: 'No tienes permisos para publicar reportes'
                })
            }

            next()
        } catch (error) {
            res.status(401).json({
                message: 'Error en la autorización'
            });
        }
    }
}