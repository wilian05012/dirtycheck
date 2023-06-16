const frm = document.forms['frm'];
frm['dirty'] = false;

function isDirty(form) {
    let isDirty = [...form.querySelectorAll('input')].filter(ctrl => { 
        const ctrlType = ctrl.getAttribute('type');
        if(ctrlType === 'radio' || ctrlType == 'checkbox') return ctrl.defaultChecked !== ctrl.checked;
        else return ctrl.defaultValue !== ctrl.value 
    }).length > 0;

    if(isDirty) return isDirty;

    isDirty |=  [...form.querySelectorAll('select')].filter(sel => {
        const selDefaultValue = sel.querySelector('option[selected]').value;

        return sel.value !== selDefaultValue;
    }).length > 0;

    return isDirty;
}


frm.addEventListener('change', evt => { frm['dirty'] = isDirty(frm); });
frm.addEventListener('reset',  evt => { frm['dirty'] = false;  });
window.addEventListener('beforeunload', evt => {
    if(frm['dirty']) {
        evt.preventDefault();
        evt.returnValue = '';
    }
});
