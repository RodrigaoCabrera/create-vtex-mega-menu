import * as XLSX from 'xlsx'

export default function converterExcelToJson(selectedFile: Blob | null) {
  return new Promise((resolve, reject) => {
    if (selectedFile) {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const data = event.target?.result
        if (!(data instanceof ArrayBuffer)) return

        const binaryString = Array.from(new Uint8Array(data), (byte) =>
          String.fromCharCode(byte)
        ).join('')
        const workbook = XLSX.read(binaryString, {
          type: 'binary',
        })
        workbook.SheetNames.forEach((sheet) => {
          const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          resolve(rowObject)
        })
      }
      fileReader.onerror = reject
      fileReader.readAsArrayBuffer(selectedFile)
    } else {
      reject('No file selected')
    }
  })
}
