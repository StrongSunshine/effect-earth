import { TextureLoader, Texture } from 'three'

const loader = new TextureLoader()

export function loadTexture(url: string): Promise<Texture> {
  return new Promise(resolve => {
    loader.load(url, resolve)
  })
}
