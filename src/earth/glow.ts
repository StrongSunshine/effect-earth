export async function createGlow() {
  const R = this.options.earth.radius; //地球半径

  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  const texture = this.options.textures.glow; // 加载纹理贴图

  // 创建精灵材质对象SpriteMaterial
  const spriteMaterial = new SpriteMaterial({
    map: texture, // 设置精灵纹理贴图
    color: 0x4390d1,
    transparent: true, //开启透明
    opacity: 0.7, // 可以通过透明度整体调节光圈
    depthWrite: false, //禁止写入深度缓冲区数据
  });

  // 创建表示地球光圈的精灵模型
  const sprite = new Sprite(spriteMaterial);
  sprite.scale.set(R * 3.0, R * 3.0, 1); //适当缩放精灵
  this.earthGroup.add(sprite);
}
