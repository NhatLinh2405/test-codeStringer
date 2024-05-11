// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
// import { IShow } from '../../pages/register'

// interface IProps {
//   setShow: (value: boolean) => void
//   show: IShow | boolean
// }

// export default function ShowPassword({ show, setShow }: IProps) {
//   return (
//     <span onClick={() => setShow(!show)}>
//       {show ? (
//         <AiFillEye className='absolute right-6 top-[calc(50%-22px)] text-3xl' />
//       ) : (
//         <AiFillEyeInvisible className='absolute right-6 top-[calc(50%-22px)] text-3xl' />
//       )}
//     </span>
//   )
// }

import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface IShow {
  password: boolean
  confirmPassword: boolean
}

export default function ShowPassword() {
  const [show, setShow] = useState<IShow>({ password: false, confirmPassword: false })
  return (
    <span onClick={() => setShow({ ...show, password: !show.password })}>
      {show.password ? (
        <AiFillEye className='absolute right-6 top-[calc(50%-22px)] text-3xl' />
      ) : (
        <AiFillEyeInvisible className='absolute right-6 top-[calc(50%-22px)] text-3xl' />
      )}
    </span>
  )
}
