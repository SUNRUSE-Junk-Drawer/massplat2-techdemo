function ShowMessage(to: string): void {
  ModifyMessage(element => {
    element.style.display = `table-cell`
    element.textContent = to
    element.innerText = to
  })
}

function HideMessage(): void {
  ModifyMessage(element => element.style.display = `none`)
}

function ModifyMessage(callback: (element: HTMLElement) => void): void {
  const element = document.getElementById(`message`)
  if (element) {
    callback(element)
  }
}
