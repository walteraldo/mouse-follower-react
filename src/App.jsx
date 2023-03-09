import { useEffect, useState } from 'react'

const FollowMouse = () => {
  // useState para activar/desactivar cuando querramos que la bolita siga al puntero
  const [enabled, setEnabled] = useState(false);
  
  // useState para guardar la posición
  const [position, setPosition] = useState({ x: -20, y: -20})

  // pointer move - seejecuta cada vez que cambia el enable
  useEffect(() => {
    // console.log('effect ', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      // console.log('handleMove', clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {                                          // si el enable es true 
      window.addEventListener('pointermove', handleMove)    // cuando se mueva el puntero ejecutamos esa función
    }

    // cuando se ejecuta el cleanup?
    // a -> cuando el componente se desmonta
    // b -> cuando cambian las dependencias, para limpiar la suscripción y antes de ejecutar el efecto de nuevo
    return () => { // cleanup method
      // console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={ () => setEnabled(!enabled) }>
        { enabled ? 'Desactivar' : 'Activar' } seguir puntero  
      </button>
    </>
  )
}

function App () {
  // para darnos cuenta cuando se ejecuta el cleanup
  const [mounted, setMounted] = useState(true);

  
  return (
    // toggle se desmonta el componente de seguir el puntero y se ejecuta el cleanup
    // <main>
    //   {/* si está montado renderiza el FollowMouse */}
    //   { mounted && <FollowMouse /> }  
    //   <button onClick={ () => setMounted(!mounted) } >
    //     Toggle Mounted Followmouse Component
    //   </button>
    // </main>
    <main>
      <FollowMouse />
    </main>
  )
}

export default App