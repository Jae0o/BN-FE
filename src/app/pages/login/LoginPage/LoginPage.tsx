import { useModal } from "@lib/hooks"

import { SignupModal } from "@app/containers"

import { Button } from "@app/components/Button"

const LoginPage = () => {
  const [isShow, openModal, closeModal] = useModal()

  return (
    <div>
      <div>로그인 페이지</div>
      <Button
        variant="secondary"
        size="m"
        onClick={openModal}>
        회원가입
      </Button>

      <SignupModal
        isShow={isShow}
        onClose={closeModal}
      />
    </div>
  )
}

export default LoginPage
