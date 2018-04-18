
/**
 * 
 * <pre> 
 * 描述：office印章 DAO接口
 * 作者:ray
 * 日期:2018-02-01 09:41:38
 * 版权：广州红迅软件
 * </pre>
 */
package com.redxun.sys.core.dao;

import com.redxun.sys.core.entity.SysStamp;
import org.springframework.stereotype.Repository;
import com.redxun.core.dao.jpa.BaseJpaDao;

@Repository
public class SysStampDao extends BaseJpaDao<SysStamp> {


	@Override
	protected Class getEntityClass() {
		return SysStamp.class;
	}

}
