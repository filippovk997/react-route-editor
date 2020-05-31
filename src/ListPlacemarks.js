/**
 * The ListPlacemarks component contains
 * list placemarks names
 */
import React from 'react';

import ItemPlacemark from './ItemPlacemark';


export default function ListPlacemarks(props) {
    function DragPointOnList(/*name*/) {
        ////////////////////////////
        function sortable(rootEl, onUpdate){
            var dragEl, nextEl;
            
            // Делаем всех детей перетаскиваемыми
            [].slice.call(rootEl.children).forEach(function (itemEl){
                itemEl.draggable = true;
            });
            
            // Функция отвечающая за сортировку
            function _onDragOver(evt){
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'move';
            
                var target = evt.target;
                if( target && target !== dragEl && target.nodeName == 'LI' ){
                    // Сортируем
                    // Не меняется последний элемент 
                    rootEl.insertBefore(dragEl, rootEl.children[0] !== target && target.nextSibling || target);
                }
            }
            
            // Окончание сортировки
            function _onDragEnd(evt){
                evt.preventDefault();
            
                dragEl.classList.remove('ghost');
                rootEl.removeEventListener('dragover', _onDragOver, false);
                rootEl.removeEventListener('dragend', _onDragEnd, false);
    
                if( nextEl !== dragEl.nextSibling ){
                    // Сообщаем об окончании сортировки
                    // onUpdate(dragEl);
                }
    
                // Записываем новую последовательность в listPoints
                let ul = document.getElementById('list');
                let li = ul.children;
                for (let i = 0; i < ul.children.length; i++) {
                    props.listPoints[i] = li[i].childNodes[0].textContent;
                }
    
                // pointToPoint();
                // RenderMap();
            }
            
            // Начало сортировки
            rootEl.addEventListener('dragstart', function (evt){
                dragEl = evt.target; // Запоминаем элемент который будет перемещать
                nextEl = dragEl.nextSibling;
                
                // Ограничиваем тип перетаскивания
                evt.dataTransfer.effectAllowed = 'move';
                evt.dataTransfer.setData('Text', dragEl.textContent);
    
                // Пописываемся на события при dnd
                rootEl.addEventListener('dragover', _onDragOver, false);
                rootEl.addEventListener('dragend', _onDragEnd, false);
    
                setTimeout(function (){
                    // Если выполнить данное действие без setTimeout, то
                    // перетаскиваемый объект, будет иметь этот класс.
                    dragEl.classList.add('ghost');
                }, 0)
            }, false);
        }
        
        // Используем                    
        sortable( document.getElementById('list'), function (item){
            console.log(item);
        });
    }

    return (
        <div className="list-points">
            <ul id="list">
                {props.listPoints.map((item) =>
                    <ItemPlacemark itemName={item}/>
                )}
            </ul>
            {DragPointOnList}
        </div>
    );
}