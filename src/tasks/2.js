import React from 'react';

/**
 * Первая правка: Кнопки “Update” у элементов списка при клике должны менять 3 цифры
 * в этом же элементе до круглых скобок с единицей (nnn (1)), но что-то не работает,
 * хотя клиент утверждает, что его разработчик написал весь код. Похоже там ошибка.
 *
 * Вторая правка: Кнопки “Update” теперь работают правильно,
 * но обновление только в одной строке заставляет перерендериваться все 200 элементов списка.
 * Это видно по счётчикам отрисовок в круглых скобках. Оптимизируй перерисовку,
 * чтобы у элементов списка при клике на “Update” происходило обновление только того компонента,
 * в котором нажимаем кнопку. renderCount уже показывает актуальное количество отрисовок компонента Row,
 * переделывать его не нужно.
 *
 * Третья правка: Рефакторинг.
 * Перепиши классы на функциональные компоненты с применением hooks, сохраняя логику первых двух исправлений.
 * Должен быть такой же счётчик рендеров, который честно отражает кол-во рендеров
 * и всё прочее устройство логики компонентов должно максимально сохраниться.
 */

export class Task2 extends React.Component {
    state = {
        list: Array.from({ length: this.props.size ?? 200 }, (_el, index) => ({
            label: `label ${index + 1}`,
            value: Task2.generateValue(),
        })),
    };

    static generateValue() {
        return Math.round(100 + Math.random() * 900);
    }

    handleUpdate = (index) => {
        this.state.list[index].value = Task2.generateValue();
    };

    render() {
        return (
            <div>
                <h1>Test app</h1>
                {this.state.list.map((el, index) => (
                    <Row data={el} index={index} onUpdate={this.handleUpdate} />
                ))}
            </div>
        );
    }
}

class Row extends React.Component {
    renderCount = 0;

    handleUpdate = () => {
        this.props.onUpdate(this.props.index);
    };

    render() {
        const {
            data: { label, value },
        } = this.props;

        this.renderCount++;

        return (
            <div>
                <span className="label">{label}:</span>
                <span>{value}</span> <span>({this.renderCount})</span>{' '}
                <button className="button" onClick={this.handleUpdate}>
                    Update
                </button>
            </div>
        );
    }
}
