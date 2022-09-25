import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import MTableBody from './m-table-body';

export default function TableMenu(items) {
    const [anchorEl, setAnchorEl] = useState(null);
    const[open, setOpen] = useState(false);
    const[val, setVal] = useState(true);
    const[valL, setValL] = useState(false);
    const[valR, setValR] = useState(false);

    const handleSortAESC = (columnDef) => {
        const orderDirection = "asc";
        items.prop.onOrderChange(
            columnDef.tableData.id,
            orderDirection
        );
        handleClose();
    }

    const handleSortDESC = (columnDef) => {
        const orderDirection = "desc";
        items.prop.onOrderChange(
            columnDef.tableData.id,
            orderDirection
        );

        handleClose();
    }

    const handleFilter = (columnDef) => {
        MTableBody.defaultProps.filter();
        const index = columnDef.tableData.columnOrder;
        const result = {
            source: {index},
            destination: {index : index},
        };
        items.prop.onPin(result);
        handleClose();
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false);
    };

    const handlePinLeft = (columnDef) => {
        const id = columnDef.tableData.id;
        const index = columnDef.tableData.columnOrder;
        const result = {
            draggableId: "1",
            type: "DEFAULT",
            source: {
                index,
                droppableId: "headers" 
            },
            reason: "DROP",
            mode: "FLUID",
            destination: {
                droppableId: "headers",
                index: 0
            },
            combine: null
        };
        items.prop.onPin(result);
        handleClose();
        setValL(true);
        setVal(false);
    }

    const handlePinRight = (columnDef) => {
        const index = columnDef.tableData.columnOrder;
        const result = {
            draggableId: "1",
            type: "DEFAULT",
            source: {
                index,
                droppableId: "headers" 
            },
            reason: "DROP",
            mode: "FLUID",
            destination: {
                droppableId: "headers",
                index: items.prop.dataCount
            },
            combine: null
        };
        items.prop.onPin(result);
        setVal(false);
        setValR(true);
        handleClose();
    }

    const handleUnPin = (columnDef) => {
        const id = columnDef.tableData.id;
        const index = columnDef.tableData.columnOrder;
        const result = {
            draggableId: "1",
            type: "DEFAULT",
            source: {
                index,
                droppableId: "headers" 
            },
            reason: "DROP",
            mode: "FLUID",
            destination: {
                droppableId: "headers",
                index: id
            },
            combine: null
        };
        items.prop.onPin(result);
        setVal(true);
        setValL(false);
        setValR(false);
        handleClose();
    }
    
    return (
        <div>
            {items.columnDef.title}
            {items.state.isOpen && <items.component
                style={{
                    cursor: "pointer",
                    color:
                        items.state.resizingColumnDef &&
                            items.state.resizingColumnDef.tableData.id ===
                            items.columnDef.tableData.id
                            ? items.inherit
                            : "inherit",
                }}
                onMouseDown={(e) => handleClick(e, items.columnDef)}
            />}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={ handleClose }
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                { items.isSortAesc && <MenuItem onClick={() => handleSortAESC(items.columnDef)}>Sort AECS</MenuItem> }
                { items.isSortDesc && <MenuItem onClick={() => handleSortDESC(items.columnDef)}>Sort DECS</MenuItem> }
                { items.isFilter && <MenuItem onClick={() => handleFilter(items.columnDef)}>Filter</MenuItem> }
                { items.ispinLeftValue && <MenuItem onClick={() => handlePinLeft(items.columnDef)} disabled = {valL}>Pin to Left</MenuItem> }
                { items.ispinRightValue && <MenuItem onClick={() => handlePinRight(items.columnDef)} disabled = {valR}>Pin to Right</MenuItem> }
                { items.isUnpin && <MenuItem onClick={() => handleUnPin(items.columnDef)} disabled = {val}>Unpin</MenuItem> }
            </Menu>
        </div>
    )
}