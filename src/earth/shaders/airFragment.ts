
export default [
  'uniform vec3	glowColor;',
  'uniform float coefficient;',
  'uniform float power;',
  'varying vec3	vVertexNormal;',
  'varying vec3	vVertexWorldPosition;',
  'varying vec4	vFragColor;',
  'void main(){',
  '	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;', //世界坐标系中从相机位置到顶点位置的距离
  '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
  '	viewCameraToVertex= normalize(viewCameraToVertex);', //规一化
  '	float intensity	= pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);',
  '	gl_FragColor = vec4(glowColor, intensity);',
  '}',
]
