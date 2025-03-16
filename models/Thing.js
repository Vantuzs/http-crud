class Thing {
    static _tableName = 'things'
    static _client;
    static name = 'Thing'

    static _attributes = {
        body: 'string'
    }

    static async create(insertValues) {
        // 1. Отсеяли "левые" атрибуты, которых мы не ожидаем
        const insertAttr = Object.entries(this._attributes)
        .filter(([attr,domein])=>attr in insertValues)
        .map(([attr])=>attr);

        // 2. К каждому атрибуту, приклеевае кавычки и запятую в конце
        // Делаем строчку, которая определяет столбци которые мы вставляем и порядок в котором мы эли столбцы будем передавать.
        const insertSchema = insertAttr.map(currentAttr => `"${currentAttr}"`).join(',');

        // 3. Делаем строчку запроса на создание, обертая ее в одинарные кавычки
        const insertValuesStr = insertAttr.map(currentAttr => {
            const value = insertValues[currentAttr];
            // Если лежит строка - обворачиваем ее в кавычки
            // Если лежит не строка - не обертаем ее в кавычки
            return typeof value === 'string' ? `'${value}'`: value;
        }).join(',');

        // 4. Непосретсвенно сам запрос к БД
        const queryStr = `
            INSERT INTO ${this._tableName} (${insertSchema})
            VALUES (${insertValuesStr})
            RETURNING *;
        `;

        // 5. выпоняем
        const {rows} = await this._client.query(queryStr)
        return rows;

    };
    static async findByPk(pk) {
        const {rows} = await this._client.query(`
            SELECT * FROM ${this._tableName}
            WHERE id = ${pk};
        `);

            return rows;
    };

    static async findAll() {
        const {rows} = await this._client.query(`
            SELECT * FROM ${this._tableName}
        `);

        return rows; 
    };

    static async updateByPk({id,updateValues}) {
        const insertAttr = Object.entries(this._attributes)
        .filter(([attr,domain]) => attr in updateValues)
        .map((attr)=> attr);

        const insertValueStr = insertAttr.map(attr => {
            const value = updateValues[attr];

            return `${attr} = ${typeof value === 'string' ? `'${value}'`: value}`
        }).join(',');

        const {rows} = await this._client.query(`
            UPDATE ${this._tableName}
            SET ${insertValueStr}
            WHERE id = ${id}
            RETURNING *;    
        `);

        return rows
    };

    static async deleteByPk(pk) {
        const {rows} = await this._client.query(`
            DELETE FROM ${this._tableName} 
            WHERE id = ${pk};    
            RETURNING *
        `);

        return rows;
    };
}

module.exports = Thing;