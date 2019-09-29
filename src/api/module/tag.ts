import ax from '../axios'

// 标签列表
export function getTags (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.get('/tag', { params })
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 增加标签
export function postTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.post('/tag/addTag', params)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 标签排序
export function patchTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.patch(`/tag`, params)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 修改标签
export function putTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/tag/edit`, params)
            .then(res => res.data)
            .catch(e => console.error(e))
}

// 删除标签
export function deleteTag (
  params: any
): Promise<Ajax.AjaxResponse> {
  return ax.put(`/tag/delete`, params)
            .then(res => res.data)
            .catch(e => console.error(e))
}
