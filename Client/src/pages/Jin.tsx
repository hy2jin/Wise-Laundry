import React, { useState } from 'react'
import styled from 'styled-components'

const InputForm = styled.label`
  p {
    width: 30%;
    margin: 0;
  }
  div {
    width: 30%;
    height: 4vh;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 10px;
      border-width: 1px;
    }
    button {
      position: absolute;
      right: 1%;
      top: 15%;
      height: 3vh;
      background-color: #96BDF3;
      border: none;
      border-radius: 15%
    }
  }
`

const Jin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValid = () => {
    const chkEmail =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    if (email.match(chkEmail)) {
      console.log('이메일 딩동댕')
    } else {
      console.log('이메일 땡')
    }
  }

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isValid()
  }
  return (
    <article>
      <h1>SIGNUP</h1>
      <section>
        <form onSubmit={(e) => onSignup(e)}>
          {/* 이메일 */}
          <InputForm htmlFor='email'>
            <p>이메일</p>
            <div>
              <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} 
                placeholder='이메일을 입력하세요'
              />
              <button>확인</button>
            </div>
          </InputForm>
          {/* 비밀번호 */}
          <InputForm htmlFor='password'>
            <p>비밀번호</p>
            <div>
              <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} 
                placeholder='비밀번호를 입력하세요'
              />
            </div>
          </InputForm>
        </form>
      </section>
    </article>
  )
}

export default Jin