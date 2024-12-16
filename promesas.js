Promise.reject(false)  
    .then(rta => console.log('ok',rta))
    .catch(error => console.log('error', error))