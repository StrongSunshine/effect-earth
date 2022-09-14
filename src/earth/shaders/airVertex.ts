
export default [
  'varying vec3	vVertexWorldPosition;',
  'varying vec3	vVertexNormal;',
  'varying vec4	vFragColor;',
  'void main(){',
  '// 将法线转换到视图坐标系中',
  ' vVertexNormal	= normalize(normalMatrix * normal);',
  '// 将顶点转换到世界坐标系中',
  ' vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',
  '// set gl_Position',
  ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
  '}'
]
