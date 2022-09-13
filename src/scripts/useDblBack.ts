export default function useDblBack() {
  const app = THING.App.current

  // 禁止thing类型的层级切换
  app.pauseEvent(THING.EventType.EnterLevel, '.Thing')

  // 禁止鼠标单击退出层级
  app.pauseEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackMethod)
  app.pauseEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation)

  // 改鼠标双击退出层级
  app.on(
    THING.EventType.DBLClick,
    ({ button }) => {
      button === 2 && app.level.back()
    },
    'double_click_to_level_back'
  )
}
