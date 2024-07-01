import React from 'react';

export const ModalHOC = (InnerComponent: any) => {

    const ModalWithHOC = (innerProps: any) => {
        return (
            <>
                {
                    (innerProps?.show as boolean) === true &&
                    (<div style={{ position: 'fixed', overflowY: 'auto', width: 'fit-content', height: 'fit-content', background: 'cornflowerblue', padding: '25px', boxShadow: '4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)', zIndex: '999999999999' }}>
                        <InnerComponent props={{ ...(innerProps as any) }} setShowForm={innerProps.setShowForm} values={innerProps.values} showEditing={innerProps.showEditing} setEditing={innerProps.setEditing} />
                    </div>) || <></>
                }
            </>
        )
    }

    return ModalWithHOC;
}